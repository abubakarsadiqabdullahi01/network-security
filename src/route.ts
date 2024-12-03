/** 
 * An Array of routes that are accessible to the public 
 * These routes do not require authentication 
 * @type {string[]}
*/
export const publicRoute = [
    "/",
];

/** 
 * An Array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
*/
export const authRoute = [
    "/auth/login",
    "/auth/register",
    "/auth/error"
];

/** 
 * The prefix for API authentication
 * Route that start with this prefix are used for API
 * authentication purpose
 * @type {string}
*/
export const apiAuthPrefix = "/api/auth";

/** 
 * The default redirect path after login
 * @type {string}
*/
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

/**
 * Admin routes that require admin role
 * @type {string[]}
 */
export const adminRoutes = [
    "/dashboard",
    "/server",
    "/settings",
    "/url",
    "/file",
];

/**
 * User routes that require user role
 * @type {string[]}
 */
export const userRoutes = [
    "/dashboard",
    "/server",
    "/url",
    "/file",
    "/settings",
];

