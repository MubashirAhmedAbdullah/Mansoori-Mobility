import { NextResponse } from "next/server";
export async function GET() {
    return NextResponse.json({
        ok: true,
        app: "Mansoori Mobility",
        mode: process.env.MONGODB_URI ? "database-configured" : "demo-ui",
        timestamp: new Date().toISOString(),
    });
}
