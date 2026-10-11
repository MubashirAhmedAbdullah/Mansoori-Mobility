import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
export async function GET() {
    try {
        const session = await getSession();
        if (!session)
            return NextResponse.json({ user: null }, { status: 401 });
        await connectToDatabase();
        const user = await User.findById(session.userId).select("name email phone roles status verificationStatus emailVerifiedAt").lean();
        if (!user || user.status !== "active")
            return NextResponse.json({ user: null }, { status: 401 });
        return NextResponse.json({ user: { id: String(user._id), name: user.name, email: user.email, phone: user.phone, roles: user.roles, activeRole: session.activeRole, verificationStatus: user.verificationStatus, emailVerifiedAt: user.emailVerifiedAt } });
    }
    catch {
        return NextResponse.json({ error: "Unable to load the current session." }, { status: 500 });
    }
}
