'use client'

import { SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import { AuthButton } from './AuthButton'
import { Brand } from './Brand'
import ThemeToggle from './ThemeToggle'

export function Header() {
    return (
        <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-lg">
            <div className="container">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo & Brand */}
                    <Brand />

                    {/* Navigation - Solo visible para usuarios autenticados */}
                    <SignedIn>
                        <nav className="hidden items-center gap-6 md:flex">
                            <Link
                                href="/admin"
                                className="text-muted hover:text-foreground text-sm font-medium transition-colors"
                            >
                                Panel de Administración
                            </Link>
                            <Link
                                href="/client"
                                className="text-muted hover:text-foreground text-sm font-medium transition-colors"
                            >
                                Panel de Reservas
                            </Link>
                        </nav>
                    </SignedIn>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <SignedIn>
                            <Link href="/client" className="btn btn-primary hidden sm:inline-flex">
                                Reservar Ahora
                            </Link>
                        </SignedIn>
                        <AuthButton />
                    </div>
                </div>
            </div>

            {/* Mobile Navigation - Solo visible para usuarios autenticados */}
            <SignedIn>
                <div className="border-t md:hidden">
                    <nav className="container flex gap-4 py-2">
                        <Link
                            href="/admin"
                            className="text-muted hover:text-foreground text-sm font-medium transition-colors"
                        >
                            Administración
                        </Link>
                        <Link
                            href="/client"
                            className="text-muted hover:text-foreground text-sm font-medium transition-colors"
                        >
                            Reservas
                        </Link>
                    </nav>
                </div>
            </SignedIn>
        </header>
    )
}
