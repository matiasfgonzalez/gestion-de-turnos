'use client'

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'

export function AuthButton() {
    return (
        <>
            <SignedOut>
                <SignInButton mode="modal">
                    <Button variant="outline" size="sm">
                        Iniciar Sesión
                    </Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: 'h-9 w-9',
                            userButtonPopoverCard:
                                'shadow-xl border border-gray-200 dark:border-gray-800',
                            userButtonPopoverActionButton:
                                'text-foreground hover:bg-gray-100 dark:hover:bg-gray-800',
                            userButtonPopoverActionButtonText: 'text-foreground',
                            userButtonPopoverActionButtonIcon: 'text-muted',
                            userButtonPopoverFooter: 'hidden',
                        },
                    }}
                />
            </SignedIn>
        </>
    )
}
