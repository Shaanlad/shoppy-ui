import { NextRequest } from "next/server";
import authenticated from "./app/auth/actions/authenticated";
import { unauthenticatedRoutes } from "./app/common/constants/routes";

export async function middleware (request: NextRequest) {
    const isUnauthenticatedRoute = unauthenticatedRoutes.some(route =>
        request.nextUrl.pathname.startsWith(route.path)
    );

    // Only redirect to login when the user is NOT authenticated and
    // the requested route is NOT one of the public (unauthenticated) routes.
    if (!(await authenticated()) && !isUnauthenticatedRoute) {
        return Response.redirect(new URL("/auth/login", request.url));
    }
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|.*\\.png$).*)"
    ]
};

// export function middleware () {}