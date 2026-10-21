"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/data/site";
import { ArrowUpRight, Search } from "@/components/Icons";

function isActive(path: string, href: string) {
  if (href === "/") return path === "/";
  if (href === "/digital-marketing-portfolio")
    return path.startsWith(href) || path.startsWith("/portfolio");
  if (href === "/digital-marketing-services")
    return path.startsWith(href) || /-services?$/.test(path);
  return path.startsWith(href);
}
export default function Header() {
  const pathname = usePathname(),
    router = useRouter();
  const [open, setOpen] = useState(false),
    [searchOpen, setSearchOpen] = useState(false),
    [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      setScrolled(window.scrollY > 24);
      const range = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0})`;
      }
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);
  const menuRef = useRef<HTMLButtonElement>(null),
    dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open && !searchOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setSearchOpen(false);
        menuRef.current?.focus();
      }
      if (e.key === "Tab" && dialogRef.current) {
        const nodes = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            "a[href],button,input",
          ),
        ).filter((el) => el.offsetParent !== null);
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    const t = setTimeout(
      () =>
        dialogRef.current
          ?.querySelector<HTMLElement>("input,button,a")
          ?.focus(),
      60,
    );
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", key);
      clearTimeout(t);
    };
  }, [open, searchOpen]);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog?s=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setOpen(false);
    }
  };
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header
        className={`site-header floating-header${scrolled ? " is-scrolled" : ""}`}
      >
        <div className="wrap header-inner">
          <Link href="/" aria-label="Darshika home" className="brand-link">
            <Image
              src={site.logo}
              alt="Darshika"
              width={160}
              height={32}
              priority
            />
            <span className="brand-dot" aria-hidden />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={
                  isActive(pathname, item.href) ? "page" : undefined
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="search-toggle"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search />
            </button>
            <Link className="header-contact" href="/contact">
              Contact
              <ArrowUpRight />
            </Link>
            <button
              ref={menuRef}
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <span />
              <span />
            </button>
          </div>
          <div className="header-progress-track" aria-hidden="true">
            <div ref={progressRef} className="header-progress" />
          </div>
        </div>
      </header>
      {(open || searchOpen) && (
        <div
          ref={dialogRef}
          className="navigation-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={searchOpen ? "Search articles" : "Navigation"}
        >
          <div className="wrap">
            <div className="overlay-top">
              <span className="eyebrow">Darshika</span>
              <button
                className="overlay-close"
                onClick={() => {
                  setOpen(false);
                  setSearchOpen(false);
                  menuRef.current?.focus();
                }}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>
            {searchOpen ? (
              <form onSubmit={submit} className="overlay-search">
                <label htmlFor="article-search">Search articles</label>
                <div>
                  <input
                    id="article-search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search articles…"
                  />
                  <button aria-label="Search" type="submit">
                    <ArrowUpRight />
                  </button>
                </div>
              </form>
            ) : (
              <>
                <nav id="mobile-navigation" className="mobile-nav">
                  {nav.map((item, i) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={
                        isActive(pathname, item.href) ? "page" : undefined
                      }
                    >
                      <span aria-hidden>0{i + 1}</span>
                      {item.label}
                      <ArrowUpRight />
                    </Link>
                  ))}
                </nav>
                <form onSubmit={submit} className="mobile-search">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search articles"
                    placeholder="Search articles…"
                  />
                  <button aria-label="Search">
                    <Search />
                  </button>
                </form>
                <a className="overlay-email" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
