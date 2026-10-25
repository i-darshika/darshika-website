"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { ArrowUpRight } from "@/components/Icons";

export default function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [failed, setFailed] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF((v) => ({ ...v, [k]: e.target.value }));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    if (new FormData(e.currentTarget).get("website")) return;
    setBusy(true);
    setStatus("");
    setFailed(false);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: f.name.trim(), email: f.email.trim(), message: f.message.trim(),
          _subject: f.subject.trim() || "New website enquiry", _template: "table",
        }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== "true")) throw new Error("Submission failed");
      setStatus("Your message has been submitted. Thank you for getting in touch!");
      setF({ name: "", email: "", subject: "", message: "" });
    } catch {
      setFailed(true);
      setStatus("Your message could not be confirmed. Please try again or email me directly below. Your message is still here.");
    } finally {
      setBusy(false);
    }
  };

  const field = "h-14 w-full border-b border-white/20 bg-transparent px-0 outline-none transition-colors placeholder:text-muted focus:border-accent";

  return (
    <form onSubmit={submit} className="mt-[50px] grid max-w-[630px] gap-x-[30px] gap-y-[31px] sm:grid-cols-2 lg:px-[15px]">
      <input required name="name" autoComplete="name" maxLength={120} aria-label="Name" placeholder="Name" value={f.name} onChange={set("name")} className={field} />
      <input required name="email" autoComplete="email" maxLength={254} type="email" aria-label="Email" placeholder="Email" value={f.email} onChange={set("email")} className={field} />
      <input name="subject" maxLength={200} aria-label="Subject" placeholder="Subject" value={f.subject} onChange={set("subject")} className={`${field} sm:col-span-2`} />
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <textarea
        required
        name="message"
        maxLength={10000}
        aria-label="Message"
        placeholder="Message"
        rows={5}
        value={f.message}
        onChange={set("message")}
        className={`${field} h-[150px] resize-none py-4 sm:col-span-2`}
      />
      <button
        type="submit"
        disabled={busy}
        aria-busy={busy}
        className="group flex h-[46px] w-fit items-center gap-[30px] rounded-[30px] border border-white/30 bg-white pl-[26px] pr-[22px] text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
      >
        {busy ? "Sending…" : "Send message"}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
      </button>
      <p className="text-sm text-muted sm:col-span-2">Your details are processed by FormSubmit to deliver your enquiry by email. See the <Link href="/privacy-policy" className="text-accent underline underline-offset-4">Privacy Policy</Link>.</p>
      <p role={failed ? "alert" : "status"} className="text-sm sm:col-span-2">{status}</p>
      {failed && <a href={`mailto:${site.email}`} className="text-accent sm:col-span-2">Email {site.email}</a>}
    </form>
  );
}
