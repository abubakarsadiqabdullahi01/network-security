import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoute,
    publicRoute,
} from "@/route";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAppAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoute.includes(nextUrl.pathname);
    const isAuthRoute = authRoute.includes(nextUrl.pathname);

    // Allow access to API routes without authentication
    if (isApiAppAuthRoute) {
        return; // Correctly return void for allowed API routes
    }

    // Handle authentication routes
    if (isAuthRoute) {
        if (isLoggedIn) {
            // If logged in, redirect to the default login redirect (presumably protected)
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return; // Correctly return void to allow access if not logged in
    }

    // Handle protected routes
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }

    return; // Correctly return void to allow access if logged in or on a public route
});

// Matcher configuration for protected and public routes
export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|api).*)", // Excludes static and API routes
        "/", // Root route
        "/api/:path*", // All API routes, allowing full API access
    ],
};
