"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, PackagePlus, Truck, MapPinned, CreditCard, FileText, MessageCircle, LifeBuoy, LogOut, Bell, Search, ChevronDown, Menu, X, CarFront, CalendarDays, Wallet, CircleDollarSign, Users, ShieldCheck, Settings, ClipboardList, ChartNoAxesCombined, Route, Boxes, FileCheck2, ReceiptText, HandCoins, AlertTriangle } from "lucide-react";
import { Brand } from "@/components/brand";
const sharedNav = [
    { label: "Overview", href: "/shipper", icon: LayoutDashboard, group: "WORKSPACE" },
];
const navByRole = {
    shipper: [
        ...sharedNav,
        { label: "Post a shipment", href: "/shipper/post-load", icon: PackagePlus },
        { label: "My shipments", href: "/shipper/shipments", icon: Truck },
        { label: "Quotes & offers", href: "/shipper/quotes", icon: ClipboardList },
        { label: "Payments", href: "/payments", icon: CreditCard },
        { label: "Documents", href: "/shipper/documents", icon: FileText, group: "MANAGE" },
        { label: "Messages", href: "/support/messages", icon: MessageCircle },
        { label: "Support centre", href: "/support", icon: LifeBuoy },
    ],
    carrier: [
        { label: "Overview", href: "/carrier", icon: LayoutDashboard, group: "WORKSPACE" },
        { label: "Load marketplace", href: "/carrier/marketplace", icon: MapPinned },
        { label: "My loads", href: "/carrier/loads", icon: Truck },
        { label: "Fleet & vehicles", href: "/carrier/fleet", icon: Boxes, group: "OPERATIONS" },
        { label: "Drivers", href: "/carrier/drivers", icon: Users },
        { label: "Earnings", href: "/finance", icon: Wallet },
        { label: "Documents", href: "/carrier/documents", icon: FileCheck2 },
        { label: "Support centre", href: "/support", icon: LifeBuoy },
    ],
    driver: [
        { label: "Overview", href: "/driver", icon: LayoutDashboard, group: "MY WORK" },
        { label: "Assigned jobs", href: "/driver/jobs", icon: Route },
        { label: "Pickup & delivery", href: "/driver/proof", icon: ClipboardList },
        { label: "My documents", href: "/driver/documents", icon: FileText, group: "ACCOUNT" },
        { label: "Support centre", href: "/support", icon: LifeBuoy },
    ],
    host: [
        { label: "Overview", href: "/host", icon: LayoutDashboard, group: "WORKSPACE" },
        { label: "My vehicles", href: "/host/vehicles", icon: CarFront },
        { label: "Availability calendar", href: "/host/calendar", icon: CalendarDays },
        { label: "Reservations", href: "/host/reservations", icon: ClipboardList },
        { label: "Inspections", href: "/host/inspections", icon: ShieldCheck, group: "MANAGE" },
        { label: "Earnings", href: "/finance", icon: Wallet },
        { label: "Reviews", href: "/host/reviews", icon: MessageCircle },
        { label: "Support centre", href: "/support", icon: LifeBuoy },
    ],
    admin: [
        { label: "Overview", href: "/admin", icon: LayoutDashboard, group: "CONTROL ROOM" },
        { label: "Users & KYC", href: "/admin/users", icon: Users },
        { label: "Bookings", href: "/admin/bookings", icon: ClipboardList },
        { label: "Vehicles", href: "/admin/vehicles", icon: CarFront },
        { label: "Payments & ledger", href: "/payments", icon: CircleDollarSign },
        { label: "Disputes", href: "/admin/disputes", icon: AlertTriangle },
        { label: "Reports", href: "/admin/reports", icon: ChartNoAxesCombined, group: "SYSTEM" },
        { label: "Settings", href: "/admin/settings", icon: Settings },
        { label: "Audit logs", href: "/admin/audit", icon: FileText },
    ],
    finance: [
        { label: "Overview", href: "/finance", icon: LayoutDashboard, group: "FINANCE" },
        { label: "Payment ledger", href: "/payments", icon: ReceiptText },
        { label: "Payout queue", href: "/finance/payouts", icon: HandCoins },
        { label: "Refunds", href: "/finance/refunds", icon: CircleDollarSign },
        { label: "Reconciliation", href: "/finance/reconciliation", icon: ChartNoAxesCombined },
        { label: "Reports", href: "/finance/reports", icon: FileText, group: "REPORTS" },
    ],
    support: [
        { label: "Overview", href: "/support", icon: LayoutDashboard, group: "SUPPORT DESK" },
        { label: "Open tickets", href: "/support/tickets", icon: MessageCircle },
        { label: "Disputes", href: "/admin/disputes", icon: AlertTriangle },
        { label: "Bookings", href: "/admin/bookings", icon: ClipboardList },
    ],
};
const roleCopy = {
    shipper: { label: "Goods owner", name: "Ali Raza", initials: "AR", description: "Shipper workspace" },
    carrier: { label: "Transport owner", name: "Usman Khan", initials: "UK", description: "Carrier workspace" },
    driver: { label: "Driver", name: "Ahmed Ali", initials: "AA", description: "Driver workspace" },
    host: { label: "Rental host", name: "Zain Malik", initials: "ZM", description: "Rental business" },
    admin: { label: "Administrator", name: "Mansoori Admin", initials: "MA", description: "Platform administration" },
    finance: { label: "Finance manager", name: "Sara Iqbal", initials: "SI", description: "Finance operations" },
    support: { label: "Support agent", name: "Hira Noor", initials: "HN", description: "Support desk" },
};
export function DashboardShell({ role, title, subtitle, children }) {
    const path = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");
    const activeRole = roleCopy[role];
    const nav = navByRole[role];
    const current = nav.find((item) => item.href === path) ?? nav.find((item) => item.href !== `/${role}` && path.startsWith(item.href)) ?? nav[0];
    const logout = () => router.push("/login");
    return <div className="min-h-screen bg-canvas md:flex">
    {menuOpen && <button aria-label="Close navigation" className="fixed inset-0 z-40 bg-slate-950/45 md:hidden" onClick={() => setMenuOpen(false)}/>}
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-[254px] flex-col bg-[#0B2235] text-white transition-transform duration-200 md:sticky md:top-0 md:h-screen md:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex h-[82px] items-center justify-between border-b border-white/10 px-5"><Brand light/><button onClick={() => setMenuOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg text-slate-300 hover:bg-white/10 md:hidden" aria-label="Close menu"><X size={18}/></button></div>
      <div className="mx-4 mt-5 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.045] p-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-400/15 text-sm font-extrabold text-teal-300">{activeRole.initials}</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-white">{activeRole.name}</p><p className="mt-0.5 text-[10px] text-slate-400">{activeRole.label}</p></div><ChevronDown size={15} className="text-slate-400"/></div>
      <nav className="slim-scrollbar mt-5 flex-1 space-y-1 overflow-y-auto px-3 pb-5">{nav.map((item, index) => <div key={item.href + item.label}>{item.group && <p className={`px-3 pb-2 ${index === 0 ? "pt-2" : "pt-5"} text-[9px] font-extrabold tracking-[.16em] text-slate-500`}>{item.group}</p>}<Link href={item.href} onClick={() => setMenuOpen(false)} className={`nav-item ${current?.href === item.href || (path === item.href) ? "nav-item-active" : ""}`}><item.icon size={17} strokeWidth={1.8}/><span className="flex-1">{item.label}</span>{item.label === "Disputes" && <span className="rounded-md bg-amber-400/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-200">3</span>}</Link></div>)}</nav>
      <div className="m-3 rounded-xl border border-white/10 bg-white/[.045] p-3"><div className="flex items-center gap-2"><ShieldCheck size={17} className="text-teal-300"/><p className="text-[11px] font-bold text-white">Your account is protected</p></div><p className="mt-1.5 text-[10px] leading-relaxed text-slate-400">Verified partners and traceable booking activity.</p><Link href="/support" className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-teal-300 hover:text-teal-200">Learn more <ChevronDown size={12} className="-rotate-90"/></Link></div>
      <button onClick={logout} className="m-3 mt-0 flex items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white"><LogOut size={17}/> Sign out</button>
    </aside>

    <div className="min-w-0 flex-1">
      <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3"><button onClick={() => setMenuOpen(true)} className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-700 md:hidden" aria-label="Open navigation"><Menu size={18}/></button><div className="min-w-0"><div className="hidden items-center gap-2 text-[10px] font-semibold text-slate-400 sm:flex"><span>MANSOORI MOBILITY</span><span>/</span><span className="text-slate-600">{activeRole.label}</span></div><p className="truncate text-sm font-bold text-slate-900 sm:mt-1">{title}</p></div></div>
        <div className="flex items-center gap-2.5 sm:gap-4"><label className="relative hidden lg:block"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search anything..." className="h-10 w-56 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none focus:border-teal-300 focus:bg-white" onKeyDown={(e) => { if (e.key === "Enter" && search.trim())
        router.push(`/search?q=${encodeURIComponent(search)}`); }}/></label><Link href="/support" aria-label="Notifications" className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"><Bell size={17}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white"/></Link><div className="hidden items-center gap-2 border-l border-slate-200 pl-4 sm:flex"><div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-teal-500 to-blue-600 text-xs font-bold text-white">{activeRole.initials}</div><div className="hidden xl:block"><p className="text-xs font-bold text-slate-800">{activeRole.name}</p><p className="text-[10px] text-slate-500">{activeRole.label}</p></div><ChevronDown size={14} className="text-slate-400"/></div></div>
      </header>
      <main className="page-wrap py-6 sm:py-8"><div className="mb-6"><p className="text-sm text-slate-500">{subtitle ?? `Here is your ${activeRole.description.toLowerCase()} at a glance.`}</p></div>{children}<footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 py-5 text-[10px] text-slate-400"><span>© 2026 Mansoori Mobility. Move Goods. Move People.</span><div className="flex gap-4"><Link href="/support" className="hover:text-teal-700">Help centre</Link><Link href="/" className="hover:text-teal-700">Visit marketplace</Link><span>PKR · Pakistan</span></div></footer></main>
    </div>
  </div>;
}
