import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
export const SESSION_COOKIE = "mm_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
function getSecret() {
    const value = process.env.SESSION_SECRET;
    if (!value || value.length < 32)
        throw new Error("SESSION_SECRET must be set to a random value of at least 32 characters.");
    return new TextEncoder().encode(value);
}
export async function createSessionToken(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
        .setIssuer("mansoori-mobility")
        .setAudience("mansoori-mobility-web")
        .sign(getSecret());
}
export async function verifySessionToken(token) {
    try {
        const { payload } = await jwtVerify(token, getSecret(), { issuer: "mansoori-mobility", audience: "mansoori-mobility-web" });
        if (typeof payload.userId !== "string" || typeof payload.email !== "string" || !Array.isArray(payload.roles))
            return null;
        return { userId: payload.userId, email: payload.email, roles: payload.roles.filter((role) => typeof role === "string"), activeRole: typeof payload.activeRole === "string" ? payload.activeRole : "shipper" };
    }
    catch {
        return null;
    }
}
export async function getSession() {
    const jar = await cookies();
    const token = jar.get(SESSION_COOKIE)?.value;
    return token ? verifySessionToken(token) : null;
}
export function sessionCookieOptions() {
    return { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: SESSION_TTL_SECONDS };
}
export function hasRole(session, roles) {
    return !!session && session.roles.some((role) => roles.includes(role));
}
