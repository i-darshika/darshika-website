"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import { Search } from "@/components/Icons";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/digital-marketing-portfolio") return pathname.startsWith(href) || pathname.startsWith("/portfolio");
  if (href === "/digital-marketing-services") return pathname.startsWith(href) || /-services?$/.test(pathname);
  return pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Past 280px the header becomes sticky; it slides away on scroll down and returns on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setStuck(y > 280);
      setHidden(y > 280 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/blog?s=${encodeURIComponent(query.trim())}`);
  };

  return (
    <>
      <header
        className={`left-0 right-0 z-50 transition-[transform,background-color,padding] duration-300 ${
          stuck ? "fixed top-0 bg-bg/90 py-3 backdrop-blur" : "absolute top-0 pt-[30px]"
        } ${hidden && !open && !searchOpen ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="wrap flex items-center justify-between gap-4">
          <div className="flex items-center gap-[15px]">
            <Link
              href="/"
              aria-label="Darshika home"
              className="flex h-[43px] w-[192px] items-center justify-center rounded-[30px] border border-white/30"
            >
              <Image src={site.logo} alt="Darshika" width={160} height={24} priority className="h-6 w-40 object-contain" />
            </Link>
            <nav className="hidden h-11 items-center rounded-[30px] border border-white/30 px-[5px] lg:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex h-[38px] items-center rounded-[30px] px-5 font-nav text-sm transition-colors hover:bg-white/10 ${
                    isActive(pathname, item.href) ? "bg-white/10" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden h-[42px] items-center rounded-[30px] bg-white px-5 font-nav text-sm font-medium text-[#1d1d1d] transition-transform hover:-translate-y-0.5 sm:flex"
            >
              Contact
            </Link>
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="hidden h-[42px] w-[42px] items-center justify-center rounded-full text-white hover:text-accent sm:flex"
            >
              <Search />
            </button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-[43px] w-[43px] flex-col items-center justify-center gap-[5px] rounded-full border border-white/30 lg:hidden"
            >
              <span className={`h-px w-5 bg-white transition ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`h-px w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-5 bg-white transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {searchOpen && (
          <form onSubmit={submitSearch} className="wrap mt-4">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              aria-label="Search articles"
              className="h-14 w-full rounded-full border border-white/40 bg-bg px-6 text-white outline-none placeholder:text-muted focus:border-accent"
            />
          </form>
        )}
      </header>

      {/* Off-canvas menu for small screens */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-bg px-4 pb-10 pt-28 transition-transform duration-500 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              className={`border-b border-line-soft py-4 text-4xl font-medium ${isActive(pathname, item.href) ? "text-accent" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <p className="text-4xl font-medium leading-tight">
            I would be delighted to <span className="font-script text-5xl text-accent">help</span> you create your brand!
          </p>
          <a href={`mailto:${site.email}`} tabIndex={open ? 0 : -1} className="mt-6 block text-lg text-muted-2">
            {site.email}
          </a>
        </div>
      </div>
    </>
  );
}
