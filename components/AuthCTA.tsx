'use client'

import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from './ui/button'
import { ArrowRightIcon, SettingsIcon, LoginIcon } from './icons'

interface AuthCTAProps {
    variant?: 'hero' | 'section' | 'cta'
    className?: string
}

export function AuthCTA({ variant = 'section', className = '' }: AuthCTAProps) {
    if (variant === 'hero') {
        return (
            <div className={`flex flex-wrap gap-4 ${className}`}>
                <SignedIn>
                    <Link href="/client">
                        <Button size="lg" className="gap-2">
                            Reservar Turno
                            <ArrowRightIcon />
                        </Button>
                    </Link>
                    <Link href="/admin">
                        <Button variant="outline" size="lg" className="gap-2">
                            <SettingsIcon />
                            Panel Admin
                        </Button>
                    </Link>
                </SignedIn>
                <SignedOut>
                    <SignInButton mode="modal">
                        <Button size="lg" className="gap-2">
                            Comenzar Ahora
                            <ArrowRightIcon />
                        </Button>
                    </SignInButton>
                    <SignInButton mode="modal">
                        <Button variant="outline" size="lg" className="gap-2">
                            <LoginIcon />
                            Iniciar Sesión
                        </Button>
                    </SignInButton>
                </SignedOut>
            </div>
        )
    }

    if (variant === 'cta') {
        return (
            <div className={`flex flex-wrap justify-center gap-4 pt-2 ${className}`}>
                <SignedIn>
                    <Link href="/client">
                        <Button size="lg" className="gap-2">
                            Reservar un Turno
                            <ArrowRightIcon />
                        </Button>
                    </Link>
                    <Link href="/admin">
                        <Button
                            variant="outline"
                            size="lg"
                            className="gap-2 border-gray-600 text-white hover:bg-gray-700"
                        >
                            <SettingsIcon />
                            Acceder como Admin
                        </Button>
                    </Link>
                </SignedIn>
                <SignedOut>
                    <SignInButton mode="modal">
                        <Button size="lg" className="gap-2">
                            Comenzar Ahora
                            <ArrowRightIcon />
                        </Button>
                    </SignInButton>
                    <SignInButton mode="modal">
                        <Button
                            variant="outline"
                            size="lg"
                            className="gap-2 border-gray-600 text-white hover:bg-gray-700"
                        >
                            <LoginIcon />
                            Iniciar Sesión
                        </Button>
                    </SignInButton>
                </SignedOut>
            </div>
        )
    }

    // Default: section variant (single button)
    return (
        <>
            <SignedIn>
                <Link href="/client">
                    <Button size="lg" className="gap-2">
                        Comenzar Ahora
                        <ArrowRightIcon />
                    </Button>
                </Link>
            </SignedIn>
            <SignedOut>
                <SignInButton mode="modal">
                    <Button size="lg" className="gap-2">
                        Comenzar Ahora
                        <ArrowRightIcon />
                    </Button>
                </SignInButton>
            </SignedOut>
        </>
    )
}

export function AdminCTA({ className = '' }: { className?: string }) {
    return (
        <div className={`flex flex-wrap gap-4 ${className}`}>
            <SignedIn>
                <Link href="/admin">
                    <Button size="lg" className="gap-2">
                        <SettingsIcon />
                        Acceder al Panel
                    </Button>
                </Link>
            </SignedIn>
            <SignedOut>
                <SignInButton mode="modal">
                    <Button size="lg" className="gap-2">
                        <SettingsIcon />
                        Acceder al Panel
                    </Button>
                </SignInButton>
            </SignedOut>
        </div>
    )
}
