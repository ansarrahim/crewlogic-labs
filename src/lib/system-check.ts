import dns from "node:dns/promises";
import tls from "node:tls";

const BLOCKED_HOSTNAMES = new Set(["localhost", "0.0.0.0"]);

function ipv4ToInt(ip: string): number {
  return ip.split(".").reduce((acc, octet) => (acc << 8) + Number(octet), 0) >>> 0;
}

function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p))) return true;

  const int = ipv4ToInt(ip);
  const inRange = (base: string, bits: number) => {
    const baseInt = ipv4ToInt(base);
    const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
    return (int & mask) === (baseInt & mask);
  };

  return (
    inRange("10.0.0.0", 8) ||
    inRange("172.16.0.0", 12) ||
    inRange("192.168.0.0", 16) ||
    inRange("127.0.0.0", 8) ||
    inRange("169.254.0.0", 16) ||
    inRange("0.0.0.0", 8)
  );
}

function isPrivateIPv6(ip: string): boolean {
  const lower = ip.toLowerCase();
  if (lower === "::1") return true;
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true;
  if (lower.startsWith("fe80")) return true;
  const mapped = lower.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isPrivateIPv4(mapped[1]);
  return false;
}

/**
 * Blocks the obvious private/loopback/link-local ranges (including the
 * 169.254.169.254 cloud metadata address). Not immune to DNS-rebinding
 * (the outbound fetch re-resolves independently) — acceptable for a
 * demo utility, not sufficient for a high-security proxy.
 */
export async function assertPublicHostname(hostname: string): Promise<void> {
  if (BLOCKED_HOSTNAMES.has(hostname.toLowerCase())) {
    throw new Error("This host is not allowed.");
  }

  const results = await dns.lookup(hostname, { all: true });
  if (results.length === 0) {
    throw new Error("Could not resolve that hostname.");
  }

  for (const { address, family } of results) {
    if (family === 4 && isPrivateIPv4(address)) {
      throw new Error("This host resolves to a private/internal address and is not allowed.");
    }
    if (family === 6 && isPrivateIPv6(address)) {
      throw new Error("This host resolves to a private/internal address and is not allowed.");
    }
  }
}

export type TlsInfo = {
  valid: boolean;
  issuer: string | null;
  validTo: string | null;
  daysRemaining: number | null;
};

export function checkTls(hostname: string, port = 443): Promise<TlsInfo | null> {
  return new Promise((resolve) => {
    let settled = false;
    const done = (value: TlsInfo | null) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    const socket = tls.connect({ host: hostname, port, servername: hostname, timeout: 6000 }, () => {
      const cert = socket.getPeerCertificate();
      const validTo = cert?.valid_to ? new Date(cert.valid_to) : null;
      const daysRemaining = validTo ? Math.round((validTo.getTime() - Date.now()) / 86_400_000) : null;
      const issuerField = cert?.issuer?.O ?? cert?.issuer?.CN ?? null;
      const issuer = Array.isArray(issuerField) ? (issuerField[0] ?? null) : issuerField;
      done({
        valid: socket.authorized,
        issuer,
        validTo: validTo ? validTo.toISOString() : null,
        daysRemaining,
      });
      socket.end();
    });

    socket.on("timeout", () => {
      socket.destroy();
      done(null);
    });
    socket.on("error", () => done(null));
  });
}
