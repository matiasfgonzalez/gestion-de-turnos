import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";
import { Toaster } from "../components/ui/sonner";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap"
});

export const metadata: Metadata = {
    title: "Gestión de Turnos - Sistema profesional de reservas",
    description:
        "Gestiona horarios de tu negocio y permite a clientes reservar turnos fácilmente. Interfaz moderna y profesional."
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
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
    `;

    return (
        <html lang="es" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body
                className={`${inter.variable} antialiased bg-background text-foreground transition-colors duration-200`}
            >
                <div className="min-h-screen flex flex-col">
                    {/* Header */}
                    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
                        <div className="container">
                            <div className="flex h-16 items-center justify-between">
                                {/* Logo & Brand */}
                                <a
                                    href="/"
                                    className="flex items-center gap-3 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-brand to-cyan-500 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-brand/25">
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
                                        <span className="font-bold text-lg leading-tight">
                                            Gestión
                                        </span>
                                        <span className="font-bold text-lg leading-tight text-brand">
                                            de Turnos
                                        </span>
                                    </div>
                                </a>

                                {/* Navigation */}
                                <nav className="hidden md:flex items-center gap-6">
                                    <a
                                        href="/admin"
                                        className="text-sm font-medium text-muted hover:text-foreground transition-colors"
                                    >
                                        Panel de Administración
                                    </a>
                                    <a
                                        href="/client"
                                        className="text-sm font-medium text-muted hover:text-foreground transition-colors"
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
                    <footer className="bg-gray-900 text-white py-16 mt-auto">
                        <div className="container">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                                {/* Brand */}
                                <div className="md:col-span-1 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-brand to-cyan-500 flex items-center justify-center">
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
                                            <span className="font-bold text-lg leading-tight">
                                                Gestión
                                            </span>
                                            <span className="font-bold text-lg leading-tight text-brand">
                                                de Turnos
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-sm">
                                        Sistema profesional de reserva de turnos
                                        para negocios. 100% privado, sin costos
                                        ocultos, con tecnología moderna.
                                    </p>
                                    {/* Social icons */}
                                    <div className="flex gap-3">
                                        <a
                                            href="#"
                                            className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
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
                                            className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="text-gray-400"
                                            >
                                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                                <rect
                                                    x="2"
                                                    y="9"
                                                    width="4"
                                                    height="12"
                                                />
                                                <circle cx="4" cy="4" r="2" />
                                            </svg>
                                        </a>
                                        <a
                                            href="#"
                                            className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
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
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                Inicio
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/admin"
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                Panel de Administración
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/client"
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                Panel de Reservas
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                {/* Legal */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-white">
                                        Legal
                                    </h4>
                                    <ul className="space-y-2 text-sm">
                                        <li>
                                            <a
                                                href="#"
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                Política de Privacidad
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                Términos y Condiciones
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                {/* Contact */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-white">
                                        Soporte
                                    </h4>
                                    <ul className="space-y-2 text-sm">
                                        <li>
                                            <a
                                                href="#"
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                Soporte y Ayuda
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                Documentación
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Bottom bar */}
                            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                                <p>
                                    © 2025 Gestión de Turnos. Todos los derechos
                                    reservados.
                                </p>
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
    );
}
