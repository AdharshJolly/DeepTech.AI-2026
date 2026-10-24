export type ManualTemplateId = "registration-confirmed" | "custom";

export interface ManualRecipient {
  email: string;
  name?: string;
}

export const MANUAL_TEMPLATES: {
  id: ManualTemplateId;
  label: string;
  defaultSubject: string;
}[] = [
  {
    id: "registration-confirmed",
    label: "Registration Confirmed",
    defaultSubject: "Registration Confirmed — DeepTech.AI 2026",
  },
  {
    id: "custom",
    label: "Custom message",
    defaultSubject: "",
  },
];

export const FALLBACK_NAME = "Attendee";
export const MAX_RECIPIENTS = 100;

const EMAIL_RE = /[^\s@<>,;"']+@[^\s@<>,;"']+\.[^\s@<>,;"']+/g;
const SINGLE_EMAIL_RE = /^[^\s@<>,;"']+@[^\s@<>,;"']+\.[^\s@<>,;"']+$/;

export function isValidEmail(value: string): boolean {
  return SINGLE_EMAIL_RE.test(value.trim());
}

/**
 * Parses pasted recipients. One per line (or separated by ; or ,).
 * A line may be `email`, `Name <email>` or `Name, email` to give a name.
 * Duplicates (case-insensitive) are dropped.
 */
export function parseRecipients(raw: string): {
  recipients: ManualRecipient[];
  invalid: string[];
} {
  const recipients: ManualRecipient[] = [];
  const invalid: string[] = [];
  const seen = new Set<string>();

  const add = (email: string, name?: string) => {
    const key = email.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    recipients.push({ email: key, name: name || undefined });
  };

  for (const line of raw.split(/[\r\n;]+/)) {
    const text = line.trim();
    if (!text) continue;

    const found = text.match(EMAIL_RE);
    if (!found) {
      invalid.push(text);
      continue;
    }

    if (found.length === 1) {
      const name = text
        .replace(found[0], "")
        .replace(/[<>"',]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      add(found[0], name);
    } else {
      // Several addresses on one line (comma/space separated) — no names.
      text
        .split(/[\s,]+/)
        .filter(Boolean)
        .forEach((part) => {
          if (isValidEmail(part)) add(part);
          else invalid.push(part);
        });
    }
  }

  return { recipients, invalid };
}

/** Parses a comma/semicolon/newline separated address list strictly. */
export function parseAddressList(raw: string): {
  emails: string[];
  invalid: string[];
} {
  const emails: string[] = [];
  const invalid: string[] = [];
  const seen = new Set<string>();
  for (const part of raw.split(/[\s,;]+/)) {
    const value = part.trim().toLowerCase();
    if (!value) continue;
    if (!isValidEmail(value)) invalid.push(part.trim());
    else if (!seen.has(value)) {
      seen.add(value);
      emails.push(value);
    }
  }
  return { emails, invalid };
}

export function stripHeaderChars(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function fillName(text: string, name: string): string {
  return text.replace(/\{\{\s*name\s*\}\}/gi, name);
}
