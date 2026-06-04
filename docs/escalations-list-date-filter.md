# Escalations List — Date Range Filter

Backend handoff for adding `dateFrom` and `dateTo` query parameters to the escalation list endpoint so the AI Assistant UI can scope the visible list to a date range. The companion `/escalations/stats` endpoint already supports these parameters (see [the stats handoff](#prior-art-escalationsstats)); this document brings the list endpoint to parity.

---

## Why

The frontend AI Assistant page exposes a date range filter (Today / Yesterday / Last 7 days / Last 30 days / This month) that must scope **both** the stats strip and the visible list to the same window — otherwise the counts and the rows visibly disagree, which is the worst possible UX for an operational view.

`/escalations/stats` already filters by `dateFrom` / `dateTo`. The list endpoint does not, so today the strip and the list diverge whenever a date range is active.

---

## Endpoint to modify

```
GET /escalations
```

Add two **optional** query parameters. Behavior matches `/escalations/stats` exactly.

### Authentication

Session cookie required on every request (unchanged).

---

## New query parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dateFrom` | `string` (ISO 8601) | No | Include only escalations with `createdAt >= dateFrom`. |
| `dateTo` | `string` (ISO 8601) | No | Include only escalations with `createdAt <= dateTo`. |

### Existing parameters (unchanged)

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | `number` | 1-based page index. |
| `limit` | `number` | Page size. |
| `status` | `enum` | `pending` \| `progress` \| `resolved`. |
| `priority` | `enum` | `low` \| `medium` \| `high` \| `urgent`. |
| `search` | `string` | Free-text search across subject / sender / content. |

### Notes

- Filtering is on escalation `createdAt`, **not** the email's `internalDate` (matches the stats endpoint).
- ISO date/time strings are recommended, e.g. `2026-05-01T00:00:00.000Z`.
- If neither `dateFrom` nor `dateTo` is sent, no date filter is applied (current behavior is preserved for clients that don't know about these params).
- If only one bound is sent, treat the other as unbounded (open interval on that side).
- Both bounds are **inclusive** (the frontend computes `from = startOfDay(d)` and `to = endOfDay(d)`, so this matches the inclusive semantics).
- Date filters compose with `status`, `priority`, and `search` — they are AND'd together.
- The result set after date filtering is paginated normally; `page` / `limit` apply to the filtered set.

### Example requests

```
GET /escalations?page=1&limit=10
GET /escalations?page=1&limit=10&dateFrom=2026-05-18T00:00:00.000Z&dateTo=2026-05-24T23:59:59.999Z
GET /escalations?page=1&limit=10&status=pending&dateFrom=2026-05-24T00:00:00.000Z
```

---

## Success response

**HTTP 200 OK** — unchanged shape.

```json
{
  "data": [
    {
      "id": "esc_01H...",
      "workflowId": "...",
      "threadId": "...",
      "userId": "...",
      "status": "pending",
      "reason": "Order status is failed - requires manual intervention",
      "email": { "...": "..." },
      "aiSuggestedResponse": "...",
      "aiSuggestedResponseConfidence": 85,
      "priority": "high",
      "createdAt": "2026-05-23T15:10:59.671Z",
      "resolvedAt": null
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalItems": 18,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

`pagination.totalItems` and `totalPages` must reflect the filtered set (i.e. counts after `dateFrom` / `dateTo` are applied), not the global total.

---

## Error responses

Same as today.

| HTTP | Meaning |
|------|---------|
| `400` | Invalid query params (see validation below) |
| `401` | Not authenticated |
| `5xx` | Server-side error |

Typical NestJS error shape:

```json
{
  "statusCode": 400,
  "message": ["dateFrom must be a valid ISO 8601 date string"],
  "error": "Bad Request"
}
```

---

## Validation rules (recommended)

Reject the request with **400 Bad Request** when:

- `dateFrom` is present but not a parseable ISO 8601 string.
- `dateTo` is present but not a parseable ISO 8601 string.
- `dateFrom` and `dateTo` are both present and `dateFrom > dateTo`.

Accept (do not 400) when:

- Either param is missing — both are optional.
- A date is far in the past or future (don't impose business constraints; just trust the timestamp).


## SSE: nothing changes

The `/escalations/stream` endpoint does not need to know about the date range — the frontend just refetches **both** the list and stats queries when an `escalations_updated` event fires. Those refetches will already carry the current `dateFrom` / `dateTo` because the React Query keys include them.

---

## Status vocabulary (reminder)

For consistency with the existing endpoints:

| Status | Meaning |
|--------|---------|
| `pending` | New ticket |
| `progress` | In progress (not `in_progress`) |
| `resolved` | Completed / closed |

---

## Integration checklist

- [ ] Accept `dateFrom` and `dateTo` query params on `GET /escalations`.
- [ ] Validate both as optional ISO 8601 strings (400 on parse failure).
- [ ] Reject `dateFrom > dateTo` with a 400.
- [ ] Apply the filter as `createdAt >= dateFrom AND createdAt <= dateTo` (inclusive).
- [ ] Compose date filter with existing `status`, `priority`, `search` filters using AND.
- [ ] Recompute `pagination.totalItems` / `totalPages` on the filtered set.
- [ ] Share the date-range filter helper between `/escalations` and `/escalations/stats`.
- [ ] Verify (or add) an index on `(user_id, created_at DESC)`.
- [ ] Keep response shape and behavior unchanged when neither param is sent.

---

## Test cases

1. **Both params absent** — endpoint returns the same result as before the change. (Backward compatibility.)
2. **Only `dateFrom`** — returns escalations with `createdAt >= dateFrom`. Pagination respects the filtered total.
3. **Only `dateTo`** — returns escalations with `createdAt <= dateTo`.
4. **Both params, valid window** — returns escalations inside the inclusive window.
5. **`dateFrom > dateTo`** — 400 Bad Request.
6. **Invalid ISO string** (e.g. `"yesterday"`) — 400 Bad Request.
7. **Date filter + `status=pending` + `priority=high`** — all three filters AND'd together.
8. **Date filter + `search=order`** — date filter narrows first, search runs on the narrowed set.
9. **Date range that excludes everything** — returns `data: []` with `totalItems: 0` and `totalPages: 0`.
10. **Parity with `/escalations/stats`** — `stats.total` for a given date range equals `pagination.totalItems` from the list endpoint with the same range and no other filters.

---

## Prior art: `/escalations/stats`

The stats endpoint already documents `dateFrom` / `dateTo`. Mirror that contract exactly — same parameter names, same ISO format, same inclusive semantics, same target field (`createdAt`). Drift between the two endpoints will manifest as the stats strip and the list disagreeing on counts, which is the bug we're trying to prevent.

---

## Related endpoints

| Method | Route | Date filter? |
|--------|-------|--------------|
| `GET` | `/escalations` | After this change: **yes** (`dateFrom`, `dateTo`) |
| `GET` | `/escalations/stats` | Yes (already) |
| `GET` | `/escalations/stream` | N/A — pushes update notifications, no filtering |
| `GET` | `/dashboard/nav-badge-counts` | Out of scope for this change |

---

## Frontend integration (already shipped)

For reference, the frontend already sends these params from these locations:

- Service layer: [`src/services/ai-assistant/index.ts`](../../src/services/ai-assistant/index.ts) — `getEscalationList` now forwards `dateFrom` / `dateTo`.
- Types: [`src/services/ai-assistant/utils/types/index.ts`](../../src/services/ai-assistant/utils/types/index.ts) — `GetEscalationListParams` declares both as optional ISO strings.
- Provider: [`src/providers/ai-assistant/index.tsx`](../../src/providers/ai-assistant/index.tsx) — `dateRange.from` / `dateRange.to` plumbed through to the query.
- UI: the date range dropdown in the filter bar emits `startOfDay(d).toISOString()` for `from` and `endOfDay(d).toISOString()` for `to`.

Once the backend ships this change, no frontend work is required — the existing query keys include `dateRange.from` / `dateRange.to`, so React Query will refetch on every range change without modification.
