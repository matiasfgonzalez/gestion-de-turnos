import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ThemeToggle from "../components/ThemeToggle"
import { Toaster } from "../components/ui/sonner"

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
})

export const metadata: Metadata = {
    title: "Gestión de Turnos - Sistema profesional de reservas",
    description:
        "Gestiona horarios de tu negocio y permite a clientes reservar turnos fácilmente. Interfaz moderna y profesional.",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    // Script to prevent FOUC - runs before paint
    const themeScript = `
        (function() {
            try {
                var theme = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var isDark = theme === 'dark' || (!theme && prefersDark);
                if (isDark) {
                    document.documentElement.classList.add('dark');
                }
            } catch (e) {}
        })();
    `

    return (
        <ClerkProvider>
            <html lang="es" suppressHydrationWarning>
                <head>
                    <script dangerouslySetInnerHTML={{ __html: themeScript }} />
                </head>
                <body
                    className={`${inter.variable} bg-background text-foreground antialiased transition-colors duration-200`}
                >
                    <div className="flex min-h-screen flex-col">
                        {/* Header */}
                        <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-lg">
                            <div className="container">
                                <div className="flex h-16 items-center justify-between">
                                    {/* Logo & Brand */}
                                    <a href="/" className="group flex items-center gap-3">
                                        <div className="from-brand shadow-brand/25 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br to-cyan-500 shadow-lg transition-transform group-hover:scale-105">
                                            <svg
                                                width="22"
                                                height="22"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M9 11l3 3L22 4" />
                                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-lg leading-tight font-bold">
                                                Gestión
                                            </span>
                                            <span className="text-brand text-lg leading-tight font-bold">
                                                de Turnos
                                            </span>
                                        </div>
                                    </a>

                                    {/* Navigation */}
                                    <nav className="hidden items-center gap-6 md:flex">
                                        <a
                                            href="/admin"
                                            className="text-muted hover:text-foreground text-sm font-medium transition-colors"
                                        >
                                            Panel de Administración
                                        </a>
                                        <a
                                            href="/client"
                                            className="text-muted hover:text-foreground text-sm font-medium transition-colors"
                                        >
                                            Panel de Reservas
                                        </a>
                                    </nav>

                                    {/* Right side */}
                                    <div className="flex items-center gap-3">
                                        <ThemeToggle />
                                        <a
                                            href="/client"
                                            className="btn btn-primary hidden sm:inline-flex"
                                        >
                                            Reservar Ahora
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Main content */}
                        <main className="flex-1">{children}</main>

                        {/* Footer */}
                        <footer className="mt-auto bg-gray-900 py-16 text-white">
                            <div className="container">
                                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                                    {/* Brand */}
                                    <div className="space-y-4 md:col-span-1">
                                        <div className="flex items-center gap-3">
                                            <div className="from-brand flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br to-cyan-500">
                                                <svg
                                                    width="22"
                                                    height="22"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="white"
                                                    strokeWidth="2.5"
                                                >
                                                    <path d="M9 11l3 3L22 4" />
                                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                                </svg>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-lg leading-tight font-bold">
                                                    Gestión
                                                </span>
                                                <span className="text-brand text-lg leading-tight font-bold">
                                                    de Turnos
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-400">
                                            Sistema profesional de reserva de turnos para negocios.
                                            100% privado, sin costos ocultos, con tecnología
                                            moderna.
                                        </p>
                                        {/* Social icons */}
                                        <div className="flex gap-3">
                                            <a
                                                href="#"
                                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 transition-colors hover:bg-gray-700"
                                            >
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="text-gray-400"
                                                >
                                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                                </svg>
                                            </a>
                                            <a
                                                href="#"
                                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 transition-colors hover:bg-gray-700"
                                            >
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="text-gray-400"
                                                >
                                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                                    <rect x="2" y="9" width="4" height="12" />
                                                    <circle cx="4" cy="4" r="2" />
                                                </svg>
                                            </a>
                                            <a
                                                href="#"
                                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 transition-colors hover:bg-gray-700"
                                            >
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="text-gray-400"
                                                >
                                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Links */}
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-white">
                                            Enlaces Rápidos
                                        </h4>
                                        <ul className="space-y-2 text-sm">
                                            <li>
                                                <a
                                                    href="/"
                                                    className="text-gray-400 transition-colors hover:text-white"
                                                >
                                                    Inicio
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/admin"
                                                    className="text-gray-400 transition-colors hover:text-white"
                                                >
                                                    Panel de Administración
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/client"
                                                    className="text-gray-400 transition-colors hover:text-white"
                                                >
                                                    Panel de Reservas
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Legal */}
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-white">Legal</h4>
                                        <ul className="space-y-2 text-sm">
                                            <li>
                                                <a
                                                    href="#"
                                                    className="text-gray-400 transition-colors hover:text-white"
                                                >
                                                    Política de Privacidad
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="text-gray-400 transition-colors hover:text-white"
                                                >
                                                    Términos y Condiciones
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Contact */}
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-white">Soporte</h4>
                                        <ul className="space-y-2 text-sm">
                                            <li>
                                                <a
                                                    href="#"
                                                    className="text-gray-400 transition-colors hover:text-white"
                                                >
                                                    Soporte y Ayuda
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="text-gray-400 transition-colors hover:text-white"
                                                >
                                                    Documentación
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Bottom bar */}
                                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 text-sm text-gray-400 sm:flex-row">
                                    <p>© 2025 Gestión de Turnos. Todos los derechos reservados.</p>
                                    <p className="flex items-center gap-1">
                                        <span>❤️</span> Hecho con Next.js
                                    </p>
                                </div>
                            </div>
                        </footer>
                    </div>
                    <Toaster position="top-right" richColors />
                </body>
            </html>
        </ClerkProvider>
    )
}
