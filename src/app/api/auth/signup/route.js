import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import User from "@/models/User";
const SignupSchema = z.object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().max(30).optional().or(z.literal("")),
    password: z.string().min(8).max(128),
    role: z.enum(["shipper", "carrier", "driver", "host"]).default("shipper"),
});
export async function POST(request) {
    try {
        const parsed = SignupSchema.safeParse(await request.json());
        if (!parsed.success)
            return NextResponse.json({ error: "Please review the required fields.", details: parsed.error.flatten().fieldErrors }, { status: 400 });
        const input = parsed.data;
        await connectToDatabase();
        const email = input.email.toLowerCase();
        const existing = await User.findOne({ email }).lean();
        if (existing)
            return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
        const passwordHash = await bcrypt.hash(input.password, 12);
        const user = await User.create({ name: input.name, email, phone: input.phone || undefined, passwordHash, roles: [input.role], status: "active" });
        const token = await createSessionToken({ userId: user.id, email: user.email, roles: user.roles, activeRole: input.role });
        const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, roles: user.roles, verificationStatus: user.verificationStatus } }, { status: 201 });
        response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
        return response;
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Account creation failed.";
        const status = message.includes("MONGODB_URI") || message.includes("Database is not configured") ? 503 : 500;
        return NextResponse.json({ error: status === 503 ? "Database is not configured. Add MONGODB_URI to .env.local." : "Account creation failed. Please try again." }, { status });
    }
}
