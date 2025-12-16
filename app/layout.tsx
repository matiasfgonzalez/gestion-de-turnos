import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Toaster } from '../components/ui/sonner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gestión de Turnos - Sistema profesional de reservas',
  description:
    'Gestiona horarios de tu negocio y permite a clientes reservar turnos fácilmente. Interfaz moderna y profesional.',
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
            <Header />

            {/* Main content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <Footer />
          </div>
          <Toaster position="top-right" richColors />
        </body>
      </html>
    </ClerkProvider>
  )
}
