type P = { className?: string };

export function ArrowUpRight({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21 3v13.5h-1.5V5.6L4 21l-1-1.1L18.4 4.5H7.5V3H21Z" />
    </svg>
  );
}

export function ArrowRight({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function Search({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function Plus({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Minus({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M5 12h14" />
    </svg>
  );
}

export function Quote({ className = "h-16 w-20" }: P) {
  return (
    <svg viewBox="0 0 100 77" fill="currentColor" className={className} aria-hidden>
      <path d="M0 77V44C0 19 13 4 38 0l4 9C28 13 21 22 20 36h20v41H0Zm58 0V44C58 19 71 4 96 0l4 9c-14 4-21 13-22 27h20v41H58Z" />
    </svg>
  );
}

// Simple glyphs for the social links.
export function Social({ label, className = "h-4 w-4" }: P & { label: string }) {
  if (label === "Facebook")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
        <path d="M14 8V6.2c0-.8.5-1.2 1.3-1.2H17V2h-2.6C11.6 2 10.5 3.8 10.5 6.3V8H8v3h2.5v11H14V11h2.6l.4-3h-3Z" />
      </svg>
    );
  if (label === "LinkedIn")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
        <path d="M4 9h3.6v12H4V9Zm1.8-6a2 2 0 1 1 0 4.1 2 2 0 0 1 0-4.1ZM9.8 9h3.5v1.7c.5-.9 1.7-2 3.6-2 3.8 0 4.5 2.5 4.5 5.7V21h-3.6v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9.8V9Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
    </svg>
  );
}
