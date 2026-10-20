"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Social } from "@/components/Icons";

export default function ShareButtons() {
  const pathname = usePathname();
  const url = `https://darshikaraj.com${pathname}`;
  const encoded = encodeURIComponent(url);
  const [status, setStatus] = useState("");
  const links = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}` },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Link copied");
    } catch {
      setStatus(`Copy this link: ${url}`);
    }
  }

  return (
    <>
      {links.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
          aria-label={`Share on ${link.label}`}
          className="flex h-[33px] w-[33px] items-center justify-center rounded-full bg-white/[0.02] hover:text-accent">
          <Social label={link.label} className="h-3.5 w-3.5" />
        </a>
      ))}
      <button type="button" onClick={copyLink} className="px-2 text-sm hover:text-accent">Copy link</button>
      <span role="status" className="text-sm text-muted">{status}</span>
    </>
  );
}
