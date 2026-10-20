"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { ArrowUpRight } from "@/components/Icons";

// No form backend yet: submitting opens the visitor's mail app with the message filled in.
export default function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF((v) => ({ ...v, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${f.message}\n\n${f.name} (${f.email})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(f.subject || "Website enquiry")}&body=${encodeURIComponent(body)}`;
  };

  const field = "h-14 w-full border-b border-white/20 bg-transparent px-0 outline-none transition-colors placeholder:text-muted focus:border-accent";

  return (
    <form onSubmit={submit} className="mt-[50px] grid max-w-[630px] gap-x-[30px] gap-y-[31px] sm:grid-cols-2 lg:px-[15px]">
      <input required aria-label="Name" placeholder="Name" value={f.name} onChange={set("name")} className={field} />
      <input required type="email" aria-label="Email" placeholder="Email" value={f.email} onChange={set("email")} className={field} />
      <input aria-label="Subject" placeholder="Subject" value={f.subject} onChange={set("subject")} className={`${field} sm:col-span-2`} />
      <textarea
        required
        aria-label="Message"
        placeholder="Message"
        rows={5}
        value={f.message}
        onChange={set("message")}
        className={`${field} h-[150px] resize-none py-4 sm:col-span-2`}
      />
      <button
        type="submit"
        className="group flex h-[46px] w-fit items-center gap-[30px] rounded-[30px] border border-white/30 bg-white pl-[26px] pr-[22px] text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
      >
        Let&apos;s Talking
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
      </button>
    </form>
  );
}
