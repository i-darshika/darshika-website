"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export default function Motion() {
  const path = usePathname();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [path]);
  return null;
}
