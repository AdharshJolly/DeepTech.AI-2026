"use client";

import { useEffect, useMemo, useState } from "react";
import { Send, Eye, Loader2, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { parseRecipients, parseAddressList } from "@/lib/manualEmailShared";

type Mode = "to" | "bcc";
type TemplateId = "registration-confirmed" | "custom";

interface Defaults {
  cc: string;
  contactEmail: string;
  templates: { id: TemplateId; label: string; defaultSubject: string }[];
  maxRecipients: number;
}

interface SendResult {
  email: string;
  success: boolean;
  error?: string;
}

const TO_BATCH = 5;

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-ieee-gray/20 focus:border-ieee-blue focus:ring-1 focus:ring-ieee-blue outline-none transition-all text-sm";
const labelClass = "block text-sm font-bold text-ieee-gray mb-1.5";

export default function EmailSender() {
  const [defaults, setDefaults] = useState<Defaults | null>(null);
  const [loadError, setLoadError] = useState("");

  const [templateId, setTemplateId] = useState<TemplateId>("registration-confirmed");
  const [subject, setSubject] = useState("Registration Confirmed — DeepTech.AI 2026");
  const [heading, setHeading] = useState("");
  const [message, setMessage] = useState("");
  const [recipientsRaw, setRecipientsRaw] = useState("");
  const [mode, setMode] = useState<Mode>("to");
  const [cc, setCc] = useState("");

  const [preview, setPreview] = useState<{ html: string; subject: string } | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const [confirming, setConfirming] = useState(false);
  const [sending, setSending] = useState(false);
  const [results, setResults] = useState<SendResult[]>([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/email");
        if (!res.ok) throw new Error();
        const data: Defaults = await res.json();
        setDefaults(data);
        setCc(data.cc || "");
      } catch {
        setLoadError("Could not load email defaults.");
      }
    };
    load();
  }, []);

  const parsed = useMemo(() => parseRecipients(recipientsRaw), [recipientsRaw]);
  const parsedCc = useMemo(() => parseAddressList(cc), [cc]);
  const max = defaults?.maxRecipients ?? 100;

  const failed = results.filter((r) => !r.success);
  const succeeded = results.filter((r) => r.success);

  const changeTemplate = (id: TemplateId) => {
    setTemplateId(id);
    const t = defaults?.templates.find((x) => x.id === id);
    setSubject(t?.defaultSubject ?? "");
    setPreview(null);
    setConfirming(false);
  };

  const validate = (): string => {
    if (!subject.trim()) return "Subject is required.";
    if (templateId === "custom" && (!heading.trim() || !message.trim()))
      return "Custom message needs a heading and a message.";
    if (parsed.recipients.length === 0) return "Add at least one recipient.";
    if (parsed.recipients.length > max) return `Maximum ${max} recipients per send.`;
    if (parsed.invalid.length > 0) return `Fix invalid entries: ${parsed.invalid.slice(0, 3).join(", ")}`;
    if (parsedCc.invalid.length > 0) return `Invalid CC address: ${parsedCc.invalid.join(", ")}`;
    return "";
  };

  const payloadBase = () => ({
    mode,
    templateId,
    subject,
    heading,
    body: message,
    cc: parsedCc.emails.join(","),
  });

  const previewName = mode === "to" ? parsed.recipients[0]?.name || "" : "";

  // Debounced live preview: refreshes ~0.5s after the last edit.
  useEffect(() => {
    if (!defaults) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setPreviewing(true);
      try {
        const res = await fetch("/api/admin/email/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ templateId, subject, heading, body: message, name: previewName }),
          signal: controller.signal,
        });
        if (!res.ok) throw new Error();
        setPreview(await res.json());
        setPreviewError(false);
      } catch (e) {
        if ((e as Error).name !== "AbortError") setPreviewError(true);
      } finally {
        if (!controller.signal.aborted) setPreviewing(false);
      }
    }, 500);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [defaults, templateId, subject, heading, message, previewName]);

  const post = async (recipients: { email: string; name?: string }[]): Promise<SendResult[]> => {
    try {
      const res = await fetch("/api/admin/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payloadBase(), recipients }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Send failed");
      return data.results as SendResult[];
    } catch (e) {
      const error = e instanceof Error ? e.message : "Send failed";
      return recipients.map((r) => ({ email: r.email, success: false, error }));
    }
  };

  const runSend = async (list: { email: string; name?: string }[], keep: SendResult[]) => {
    setSending(true);
    setConfirming(false);
    setFormError("");
    setResults(keep);
    let acc = keep;
    if (mode === "bcc") {
      acc = [...acc, ...(await post(list))];
      setResults(acc);
    } else {
      for (let i = 0; i < list.length; i += TO_BATCH) {
        acc = [...acc, ...(await post(list.slice(i, i + TO_BATCH)))];
        setResults(acc);
      }
    }
    setSending(false);
  };

  const handleSend = () => {
    const err = validate();
    if (err) {
      setFormError(err);
      setConfirming(false);
      return;
    }
    setFormError("");
    if (!confirming) {
      setConfirming(true);
      return;
    }
    runSend(parsed.recipients, []);
  };

  const handleRetry = () => {
    const byEmail = new Map(parsed.recipients.map((r) => [r.email, r]));
    const retry = failed.map((f) => byEmail.get(f.email) ?? { email: f.email });
    runSend(retry, succeeded);
  };

  if (loadError) {
    return <p className="text-sm text-rose-600 font-semibold">{loadError}</p>;
  }
  if (!defaults) {
    return (
      <div className="flex items-center gap-2 text-ieee-gray py-10">
        <Loader2 className="w-5 h-5 animate-spin" /> Loading…
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 items-start">
      {/* Compose */}
      <div className="bg-white rounded-3xl border border-ieee-gray/10 p-6 md:p-8 shadow-sm space-y-6">
        <div>
          <label className={labelClass}>Template</label>
          <select
            value={templateId}
            onChange={(e) => changeTemplate(e.target.value as TemplateId)}
            className={inputClass}
          >
            {defaults.templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={inputClass}
            placeholder="Email subject"
          />
        </div>

        {templateId === "custom" && (
          <>
            <div>
              <label className={labelClass}>Heading (in the coloured header)</label>
              <input
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                className={inputClass}
                placeholder="e.g. Venue Update"
              />
            </div>
            <div>
              <label className={labelClass}>Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={7}
                className={inputClass}
                placeholder={"Blank line = new paragraph.\nUse {{name}} to insert the recipient's name."}
              />
            </div>
          </>
        )}

        <div>
          <label className={labelClass}>Recipients</label>
          <textarea
            value={recipientsRaw}
            onChange={(e) => setRecipientsRaw(e.target.value)}
            rows={6}
            className={`${inputClass} font-mono`}
            placeholder={"one per line\nasha@example.com\nRavi Kumar <ravi@example.com>"}
          />
          <p className="text-xs mt-1.5 text-ieee-gray">
            <strong className="text-ieee-black">{parsed.recipients.length}</strong> valid
            {parsed.invalid.length > 0 && (
              <span className="text-rose-600 font-semibold">
                {" "}· {parsed.invalid.length} invalid ({parsed.invalid.slice(0, 2).join(", ")}
                {parsed.invalid.length > 2 ? "…" : ""})
              </span>
            )}
            {" "}· max {max}. Add a name (<code>Name &lt;email&gt;</code>) to personalise the greeting; otherwise it says &quot;Attendee&quot;.
          </p>
        </div>

        <div>
          <label className={labelClass}>Send recipients as</label>
          <div className="grid sm:grid-cols-2 gap-3">
            {(
              [
                ["to", "To (individual)", "One separate email per person. Nobody sees anyone else's address. Names personalise the greeting."],
                ["bcc", "BCC (single email)", "One email, all recipients hidden (no visible 'To'). Uses 1 quota per recipient."],
              ] as [Mode, string, string][]
            ).map(([value, title, desc]) => (
              <label
                key={value}
                className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                  mode === value
                    ? "border-ieee-blue bg-ieee-blue/5 ring-1 ring-ieee-blue"
                    : "border-ieee-gray/20 hover:border-ieee-blue/40"
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  value={value}
                  checked={mode === value}
                  onChange={() => {
                    setMode(value);
                    setConfirming(false);
                  }}
                  className="sr-only"
                />
                <span className="block text-sm font-bold text-ieee-black">{title}</span>
                <span className="block text-xs text-ieee-gray mt-1 leading-relaxed">{desc}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>CC (optional, visible to recipients)</label>
          <input
            value={cc}
            onChange={(e) => setCc(e.target.value)}
            className={inputClass}
            placeholder="comma-separated emails"
          />
          <p className="text-xs mt-1.5 text-ieee-gray">
            {parsedCc.invalid.length > 0 ? (
              <span className="text-rose-600 font-semibold">Invalid: {parsedCc.invalid.join(", ")}</span>
            ) : (
              <>
                Prefilled from Settings → Admin CC. In &quot;To&quot; mode every email carries this CC, and each CC
                address counts against the daily quota.
              </>
            )}
          </p>
        </div>

        {formError && <p className="text-sm font-semibold text-rose-600">{formError}</p>}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSend}
            disabled={sending}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50 ${
              confirming ? "bg-ieee-orange hover:bg-ieee-orange/90" : "bg-ieee-blue hover:bg-ieee-blue/90"
            }`}
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {sending
              ? "Sending…"
              : confirming
                ? `Confirm: send to ${parsed.recipients.length} (${mode.toUpperCase()})`
                : "Send"}
          </button>
          {confirming && !sending && (
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="px-4 py-3 text-sm font-semibold text-ieee-gray hover:text-ieee-black"
            >
              Cancel
            </button>
          )}
        </div>

        {results.length > 0 && (
          <div className="rounded-2xl border border-ieee-gray/10 p-4 space-y-3">
            <p className="text-sm font-bold text-ieee-black flex items-center gap-2">
              {sending && <Loader2 className="w-4 h-4 animate-spin" />}
              {succeeded.length} sent
              {failed.length > 0 && <span className="text-rose-600"> · {failed.length} failed</span>}
              {sending && ` · ${results.length} of ${parsed.recipients.length} done`}
            </p>
            <ul className="max-h-48 overflow-y-auto text-xs space-y-1">
              {results.map((r) => (
                <li key={r.email} className="flex items-start gap-2">
                  {r.success ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span className="break-all">
                    {r.email}
                    {r.error && <span className="text-rose-600"> — {r.error}</span>}
                  </span>
                </li>
              ))}
            </ul>
            {failed.length > 0 && !sending && (
              <button
                type="button"
                onClick={handleRetry}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-ieee-orange text-white text-sm font-bold hover:bg-ieee-orange/90"
              >
                <RotateCcw className="w-4 h-4" /> Retry {failed.length} failed
              </button>
            )}
          </div>
        )}
      </div>

      {/* Preview */}
      <div className="bg-white rounded-3xl border border-ieee-gray/10 p-6 shadow-sm lg:sticky lg:top-0">
        <p className="text-sm font-bold text-ieee-black mb-3 flex items-center gap-2">
          <Eye className="w-4 h-4" /> Live preview
          {previewing && <Loader2 className="w-3.5 h-3.5 animate-spin text-ieee-gray" />}
          {previewError && <span className="text-xs font-semibold text-rose-600">Preview failed</span>}
        </p>
        <dl className="text-xs grid grid-cols-[3.5rem_1fr] gap-x-2 gap-y-1 mb-3 rounded-xl bg-ieee-gray/5 p-3">
          <dt className="font-bold text-ieee-gray">To</dt>
          <dd className="break-all text-ieee-black">
            {mode === "to"
              ? `${parsed.recipients.length} separate email${parsed.recipients.length === 1 ? "" : "s"} (one per recipient)`
              : "— (recipients hidden)"}
          </dd>
          {mode === "bcc" && (
            <>
              <dt className="font-bold text-ieee-gray">BCC</dt>
              <dd className="text-ieee-black">{parsed.recipients.length} hidden recipient(s)</dd>
            </>
          )}
          <dt className="font-bold text-ieee-gray">CC</dt>
          <dd className="break-all text-ieee-black">{parsedCc.emails.join(", ") || "—"}</dd>
          <dt className="font-bold text-ieee-gray">Subject</dt>
          <dd className="break-words font-semibold text-ieee-black">{preview?.subject || "—"}</dd>
        </dl>
        {preview ? (
          <iframe
            title="Email preview"
            sandbox=""
            srcDoc={preview.html}
            className="w-full h-[640px] rounded-xl border border-ieee-gray/10 bg-white"
          />
        ) : (
          <p className="text-sm text-ieee-gray py-16 text-center">Generating preview…</p>
        )}
      </div>
    </div>
  );
}
