// Official Darshika wordmark (text, Outfit bold): "DARSHiKA" with a purple dot on the i.
// Colours come from CSS (.brand-word / .brand-i); add a modifier class for other backgrounds.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-word ${className}`.trim()} aria-hidden>
      DARSH<span className="brand-i">i</span>KA
    </span>
  );
}
