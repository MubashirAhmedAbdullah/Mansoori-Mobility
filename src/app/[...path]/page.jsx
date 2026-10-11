"use client";
import { usePathname } from "next/navigation";
import { PanelPageRouter } from "@/components/panel-pages";
export default function CatchAllPage() {
    const pathname = usePathname();
    return <PanelPageRouter pathname={pathname}/>;
}
