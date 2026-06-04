import z from "zod";
import { VISUAL_BUILDER_FORM_SCHEMA } from "../../components/signature-builder-tabs/schema/visual-builder";

export const generateSignaturePreview = (
  data: z.infer<typeof VISUAL_BUILDER_FORM_SCHEMA>
): string => {
  const {
    name = "",
    title = "",
    company = "",
    companyUrl = "",
    phone = "",
    email = "",
    photoUrl = "",
  } = data;

  if (!name && !title && !company && !phone && !email) {
    return '<p style="color: #666; font-family: Arial, sans-serif; font-size: 14px; margin: 20px 0;">No signature configured</p>';
  }

  // Use clean signature format
  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 14px; line-height: 1.5; color: #333333; max-width: 400px;">
  <div style="display: flex; align-items: flex-start; gap: 12px;">
    ${
      photoUrl
        ? `<img src="${photoUrl}" alt="${
            name || "Profile"
          }" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid #f0f0f0;" />`
        : ""
    }
    <div>
      ${
        name
          ? `<div style="font-size: 16px; font-weight: 600; color: #1a1a1a; margin-bottom: 2px;">${name}</div>`
          : ""
      }
      ${
        title
          ? `<div style="font-size: 14px; color: #666666; margin-bottom: 4px;">${title}</div>`
          : ""
      }
      ${
        company
          ? `<div style="font-size: 14px; font-weight: 500; color: #1a1a1a; margin-bottom: 6px;">${
              companyUrl
                ? `<a href="${companyUrl}" target="_blank" style="color: #1a1a1a; text-decoration: none;">${company}</a>`
                : company
            }</div>`
          : ""
      }
      <div style="font-size: 14px; line-height: 1.4;">
        ${
          email
            ? `<div><a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a></div>`
            : ""
        }
        ${
          phone
            ? `<div><a href="tel:${phone.replace(
                /\s/g,
                ""
              )}" style="color: #666666; text-decoration: none;">${phone}</a></div>`
            : ""
        }
      </div>
    </div>
  </div>
</div>`.trim();
};
