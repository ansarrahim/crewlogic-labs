import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_PAYLOAD = "admin-session";

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured.");
  return secret;
}

export function signAdminSession(): string {
  return createHmac("sha256", getSecret()).update(SESSION_PAYLOAD).digest("hex");
}

export function isValidAdminSession(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  let expected: string;
  try {
    expected = signAdminSession();
  } catch {
    return false;
  }
  const actual = Buffer.from(cookieValue);
  const expectedBuf = Buffer.from(expected);
  if (actual.length !== expectedBuf.length) return false;
  return timingSafeEqual(actual, expectedBuf);
}
