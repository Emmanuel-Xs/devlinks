import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedOrigins = [
  "https://devlinks-abc.vercel.app",
  "http://localhost:3000",
];

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Bypass CSRF for OAuth endpoints
  if (
    request.nextUrl.pathname.startsWith("/api/github") ||
    request.nextUrl.pathname.startsWith("/api/google")
  ) {
    return NextResponse.next();
  }

  if (request.method === "GET") {
    const response = NextResponse.next();
    const token = request.cookies.get("session")?.value ?? null;
    if (token !== null) {
      // Only extend cookie expiration on GET requests since we can be sure
      // a new session wasn't set when handling the request.
      response.cookies.set("session", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
    }
    return response;
  }

  // CSRF protection
  const originHeader = request.headers.get("Origin");
  const hostHeader = request.headers.get("Host");
  if (!originHeader || !hostHeader)
    return new NextResponse(null, { status: 403 });

  const origin = new URL(originHeader);
  if (origin.host !== hostHeader)
    return new NextResponse(null, { status: 403 });

  const originCors = request.headers.get("Origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(originCors);
  const isPreflight = request.method === "OPTIONS";

  // Handle preflight requests
  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": originCors }),
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Max-Age": "600",
    };

    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Handle simple requests
  const response = NextResponse.next();
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", originCors);
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }

  return response;
}
