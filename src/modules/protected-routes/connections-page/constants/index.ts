export const TIMEZONES = [
  // North America
  {
    value: "America/New_York",
    label: "Eastern Time (ET)",
    offset: "UTC-5/UTC-4",
  },
  {
    value: "America/Chicago",
    label: "Central Time (CT)",
    offset: "UTC-6/UTC-5",
  },
  {
    value: "America/Denver",
    label: "Mountain Time (MT)",
    offset: "UTC-7/UTC-6",
  },
  {
    value: "America/Los_Angeles",
    label: "Pacific Time (PT)",
    offset: "UTC-8/UTC-7",
  },
  { value: "America/Phoenix", label: "Arizona Time (MST)", offset: "UTC-7" },
  { value: "America/Toronto", label: "Toronto (ET)", offset: "UTC-5/UTC-4" },
  {
    value: "America/Vancouver",
    label: "Vancouver (PT)",
    offset: "UTC-8/UTC-7",
  },

  // Europe
  { value: "Europe/London", label: "London (GMT/BST)", offset: "UTC+0/UTC+1" },
  { value: "Europe/Paris", label: "Paris (CET/CEST)", offset: "UTC+1/UTC+2" },
  { value: "Europe/Berlin", label: "Berlin (CET/CEST)", offset: "UTC+1/UTC+2" },
  { value: "Europe/Madrid", label: "Madrid (CET/CEST)", offset: "UTC+1/UTC+2" },
  { value: "Europe/Rome", label: "Rome (CET/CEST)", offset: "UTC+1/UTC+2" },
  {
    value: "Europe/Amsterdam",
    label: "Amsterdam (CET/CEST)",
    offset: "UTC+1/UTC+2",
  },

  // Asia Pacific
  { value: "Asia/Tokyo", label: "Tokyo (JST)", offset: "UTC+9" },
  { value: "Asia/Shanghai", label: "Beijing/Shanghai (CST)", offset: "UTC+8" },
  { value: "Asia/Singapore", label: "Singapore (SGT)", offset: "UTC+8" },
  { value: "Asia/Hong_Kong", label: "Hong Kong (HKT)", offset: "UTC+8" },
  { value: "Asia/Seoul", label: "Seoul (KST)", offset: "UTC+9" },
  {
    value: "Australia/Sydney",
    label: "Sydney (AEST/AEDT)",
    offset: "UTC+10/UTC+11",
  },
  {
    value: "Australia/Melbourne",
    label: "Melbourne (AEST/AEDT)",
    offset: "UTC+10/UTC+11",
  },

  // Other regions
  { value: "UTC", label: "UTC", offset: "UTC+0" },
  { value: "America/Sao_Paulo", label: "São Paulo (BRT)", offset: "UTC-3" },
  { value: "Asia/Dubai", label: "Dubai (GST)", offset: "UTC+4" },
  { value: "Africa/Cairo", label: "Cairo (EET)", offset: "UTC+2" },
];
