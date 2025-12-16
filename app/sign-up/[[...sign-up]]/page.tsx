import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
    return (
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center py-12">
            <SignUp
                appearance={{
                    elements: {
                        rootBox: 'mx-auto',
                        card: 'shadow-xl border border-gray-200 dark:border-gray-800',
                        headerTitle: 'text-foreground',
                        headerSubtitle: 'text-muted',
                        socialButtonsBlockButton:
                            'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-foreground hover:bg-gray-50 dark:hover:bg-gray-700',
                        socialButtonsBlockButtonText: 'text-foreground font-medium',
                        dividerLine: 'bg-gray-300 dark:bg-gray-700',
                        dividerText: 'text-muted',
                        formFieldLabel: 'text-foreground',
                        formFieldInput:
                            'bg-background border-gray-300 dark:border-gray-700 text-foreground',
                        footerActionLink: 'text-brand hover:text-brand/80',
                        formButtonPrimary: 'bg-brand hover:bg-brand/90',
                    },
                }}
            />
        </div>
    )
}
