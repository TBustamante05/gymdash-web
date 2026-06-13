import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Lee la cookie directamente — el middleware corre en el servidor
    const token = request.cookies.get('gymdash_token')?.value

    const isAuthRoute = request.nextUrl.pathname.startsWith('/login') ||
                        request.nextUrl.pathname.startsWith('/register')

    // Si no hay token e intenta entrar al dashboard → manda al login
    if (!token && !isAuthRoute) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Evita que un usuario logueado vea el login de nuevo
    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

// qué rutas ejecutar
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/routines/:path*',
        '/progress/:path*',
        '/calendar/:path*',
        '/timer/:path*',
        '/login',
        '/register'
    ]
}