import { ArrowDownRight, ArrowUpRight } from "lucide-react";
export function StatusBadge({ children, tone = "slate" }) {
    const tones = {
        green: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
        blue: "bg-blue-50 text-blue-700 ring-blue-600/10",
        amber: "bg-amber-50 text-amber-700 ring-amber-600/10",
        red: "bg-rose-50 text-rose-700 ring-rose-600/10",
        teal: "bg-teal-50 text-teal-700 ring-teal-600/10",
        slate: "bg-slate-100 text-slate-600 ring-slate-500/10",
    };
    return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ring-inset ${tones[tone]}`}>{children}</span>;
}
export function MetricCard({ label, value, change, icon, tone = "teal", footnote }) {
    const colors = { teal: "bg-teal-50 text-teal-700", blue: "bg-blue-50 text-blue-700", amber: "bg-amber-50 text-amber-700", purple: "bg-violet-50 text-violet-700" };
    return <div className="surface p-4 sm:p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-500">{label}</p><p className="mt-2 text-[25px] font-extrabold tracking-tight text-slate-900">{value}</p></div><span className={`stat-icon ${colors[tone]}`}>{icon}</span></div>{change && <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-emerald-700"><ArrowUpRight size={14}/>{change}<span className="font-normal text-slate-400">vs last month</span></div>}{footnote && <div className="mt-3 flex items-center gap-1 text-[11px] text-slate-500"><ArrowDownRight size={13} className="text-amber-500"/>{footnote}</div>}</div>;
}
export function SectionHeading({ title, subtitle, action }) {
    return <div className="mb-4 flex flex-wrap items-end justify-between gap-3"><div><h2 className="section-title">{title}</h2>{subtitle && <p className="section-subtitle">{subtitle}</p>}</div>{action}</div>;
}
export function EmptyState({ title, body, icon }) {
    return <div className="flex flex-col items-center justify-center py-12 text-center"><span className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-500">{icon}</span><p className="font-semibold text-slate-800">{title}</p><p className="mt-1 max-w-sm text-sm text-slate-500">{body}</p></div>;
}
