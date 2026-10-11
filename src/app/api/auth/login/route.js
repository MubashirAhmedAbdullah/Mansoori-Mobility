import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import User from "@/models/User";
const LoginSchema = z.object({ email: z.string().trim().email().max(254), password: z.string().min(1).max(128), role: z.string().optional() });
export async function POST(request) {
    try {
        const parsed = LoginSchema.safeParse(await request.json());
        if (!parsed.success)
            return NextResponse.json({ error: "Enter a valid email and password." }, { status: 400 });
        await connectToDatabase();
        const email = parsed.data.email.toLowerCase();
        const user = await User.findOne({ email }).select("+passwordHash");
        if (!user)
            return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
        if (user.status !== "active")
            return NextResponse.json({ error: "This account is restricted. Contact support." }, { status: 403 });
        const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
        if (!valid)
            return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
        const activeRole = parsed.data.role && user.roles.includes(parsed.data.role) ? parsed.data.role : user.roles[0];
        user.lastLoginAt = new Date();
        await user.save();
        const token = await createSessionToken({ userId: user.id, email: user.email, roles: user.roles, activeRole });
        const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, roles: user.roles, activeRole, verificationStatus: user.verificationStatus } });
        response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
        return response;
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Sign in failed.";
        const status = message.includes("MONGODB_URI") || message.includes("Database is not configured") ? 503 : 500;
        return NextResponse.json({ error: status === 503 ? "Database is not configured. Add MONGODB_URI to .env.local." : "Sign in failed. Please try again." }, { status });
    }
}
