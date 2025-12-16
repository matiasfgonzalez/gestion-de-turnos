import Link from 'next/link'
import { BrandStatic } from './Brand'
import { TwitterIcon, LinkedInIcon, GithubIcon } from './icons'

const quickLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/admin', label: 'Panel de Administración' },
    { href: '/client', label: 'Panel de Reservas' },
]

const legalLinks = [
    { href: '#', label: 'Política de Privacidad' },
    { href: '#', label: 'Términos y Condiciones' },
]

const supportLinks = [
    { href: '#', label: 'Soporte y Ayuda' },
    { href: '#', label: 'Documentación' },
]

const socialLinks = [
    { href: '#', icon: TwitterIcon, label: 'Twitter' },
    { href: '#', icon: LinkedInIcon, label: 'LinkedIn' },
    { href: '#', icon: GithubIcon, label: 'GitHub' },
]

export function Footer() {
    return (
        <footer className="mt-auto bg-gray-900 py-16 text-white">
            <div className="container">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-4 md:col-span-1">
                        <BrandStatic />
                        <p className="text-sm text-gray-400">
                            Sistema profesional de reserva de turnos para negocios. 100% privado,
                            sin costos ocultos, con tecnología moderna.
                        </p>
                        {/* Social icons */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 transition-colors hover:bg-gray-700"
                                >
                                    <social.icon className="text-gray-400" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-white">Enlaces Rápidos</h4>
                        <ul className="space-y-2 text-sm">
                            {quickLinks.map((link) => (
                                <li key={link.href + link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-white">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            {legalLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-white">Soporte</h4>
                        <ul className="space-y-2 text-sm">
                            {supportLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 text-sm text-gray-400 sm:flex-row">
                    <p>
                        © {new Date().getFullYear()} Gestión de Turnos. Todos los derechos
                        reservados.
                    </p>
                    <p className="flex items-center gap-1">
                        <span>❤️</span> Hecho con Next.js
                    </p>
                </div>
            </div>
        </footer>
    )
}
