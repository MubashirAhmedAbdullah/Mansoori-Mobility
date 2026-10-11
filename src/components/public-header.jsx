"use client";
import Link from "next/link";
import { Menu, X, ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Brand } from "@/components/brand";
export function PublicHeader() {
    const [open, setOpen] = useState(false);
    const links = [
        { label: "Freight", href: "/freight" },
        { label: "Rent a car", href: "/rentals" },
        { label: "How it works", href: "/#how-it-works" },
        { label: "Vehicle owners", href: "/carrier" },
        { label: "Help centre", href: "/support" },
    ];
    return <header className="relative z-30 border-b border-slate-100 bg-white">
    <div className="page-wrap flex h-[76px] items-center justify-between gap-6">
      <Brand />
      <nav className="hidden items-center gap-7 lg:flex">{links.map((item) => <Link key={item.label} href={item.href} className="text-[13px] font-semibold text-slate-600 transition hover:text-teal-700">{item.label}</Link>)}</nav>
      <div className="hidden items-center gap-3 sm:flex"><Link href="/login" className="px-2 py-2 text-sm font-semibold text-slate-700 hover:text-teal-700">Log in</Link><Link href="/signup" className="btn-primary">Get started <ChevronDown size={14} className="rotate-[-90deg]"/></Link></div>
      <button onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-700 sm:hidden">{open ? <X size={20}/> : <Menu size={20}/>}</button>
    </div>
    {open && <div className="absolute left-0 right-0 top-full border-t border-slate-100 bg-white p-4 shadow-lift sm:hidden"><nav className="flex flex-col gap-1">{links.map((item) => <Link key={item.label} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-teal-50">{item.label}</Link>)}<div className="mt-2 grid grid-cols-2 gap-2"><Link href="/login" onClick={() => setOpen(false)} className="btn-outline">Log in</Link><Link href="/signup" onClick={() => setOpen(false)} className="btn-primary">Get started</Link></div></nav><p className="mt-4 flex items-center gap-2 text-xs text-slate-500"><HelpCircle size={14}/> Need help? Our team is here for you.</p></div>}
  </header>;
}
