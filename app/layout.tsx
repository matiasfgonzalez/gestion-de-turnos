import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";

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
    return (
        <html lang="es" suppressHydrationWarning>
            <body className={`${inter.variable} antialiased`}>
                <div className="min-h-screen flex flex-col">
                    {/* Header */}
                    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
                        <div className="container">
                            <div className="flex h-16 items-center justify-between">
                                {/* Logo & Brand */}
                                <div className="flex items-center gap-3">
                                    <a
                                        href="/"
                                        className="flex items-center gap-2 group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-brand to-accent flex items-center justify-center group-hover:scale-105 transition-transform">
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <rect
                                                    x="3"
                                                    y="4"
                                                    width="18"
                                                    height="18"
                                                    rx="2"
                                                    ry="2"
                                                />
                                                <line
                                                    x1="16"
                                                    y1="2"
                                                    x2="16"
                                                    y2="6"
                                                />
                                                <line
                                                    x1="8"
                                                    y1="2"
                                                    x2="8"
                                                    y2="6"
                                                />
                                                <line
                                                    x1="3"
                                                    y1="10"
                                                    x2="21"
                                                    y2="10"
                                                />
                                            </svg>
                                        </div>
                                        <span className="font-semibold text-lg">
                                            Gestión de Turnos
                                        </span>
                                    </a>
                                    <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted px-2 py-1 rounded-full bg-input">
                                        <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                                        Demo local
                                    </span>
                                </div>

                                {/* Navigation */}
                                <nav className="flex items-center gap-2">
                                    <a
                                        className="btn btn-ghost text-sm hidden sm:inline-flex"
                                        href="/admin"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20 7h-9M14 17H5M17 3v18M10 17l-3-3 3-3" />
                                        </svg>
                                        Administrar
                                    </a>
                                    <a
                                        className="btn btn-primary"
                                        href="/client"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="hidden sm:inline"
                                        >
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                        <span className="hidden sm:inline">
                                            Reservar turno
                                        </span>
                                        <span className="sm:hidden">
                                            Reservar
                                        </span>
                                    </a>
                                    <ThemeToggle />
                                </nav>
                            </div>
                        </div>
                    </header>

                    {/* Main content */}
                    <main className="flex-1">{children}</main>

                    {/* Footer */}
                    <footer className="border-t py-8 mt-auto">
                        <div className="container">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
                                <p>
                                    © 2024 Gestión de Turnos. Datos guardados
                                    localmente.
                                </p>
                                <div className="flex items-center gap-4">
                                    <a href="/" className="hover:text-brand">
                                        Inicio
                                    </a>
                                    <a
                                        href="/admin"
                                        className="hover:text-brand"
                                    >
                                        Admin
                                    </a>
                                    <a
                                        href="/client"
                                        className="hover:text-brand"
                                    >
                                        Cliente
                                    </a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    );
}
