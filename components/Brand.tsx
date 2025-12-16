import Link from 'next/link'
import { LogoIcon } from './icons'

interface BrandProps {
    showText?: boolean
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const sizeConfig = {
    sm: {
        container: 'h-8 w-8',
        icon: 18,
        text: 'text-base',
    },
    md: {
        container: 'h-10 w-10',
        icon: 22,
        text: 'text-lg',
    },
    lg: {
        container: 'h-12 w-12',
        icon: 26,
        text: 'text-xl',
    },
}

export function Brand({ showText = true, size = 'md', className = '' }: BrandProps) {
    const config = sizeConfig[size]

    return (
        <Link href="/" className={`group flex items-center gap-3 ${className}`}>
            <div
                className={`${config.container} from-brand shadow-brand/25 flex items-center justify-center rounded-xl bg-linear-to-br to-cyan-500 shadow-lg transition-transform group-hover:scale-105`}
            >
                <LogoIcon size={config.icon} className="stroke-white" />
            </div>
            {showText && (
                <div className="flex flex-col">
                    <span className={`${config.text} leading-tight font-bold`}>Gestión</span>
                    <span className={`${config.text} text-brand leading-tight font-bold`}>
                        de Turnos
                    </span>
                </div>
            )}
        </Link>
    )
}

export function BrandStatic({ showText = true, size = 'md', className = '' }: BrandProps) {
    const config = sizeConfig[size]

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div
                className={`${config.container} from-brand flex items-center justify-center rounded-xl bg-linear-to-br to-cyan-500`}
            >
                <LogoIcon size={config.icon} className="stroke-white" />
            </div>
            {showText && (
                <div className="flex flex-col">
                    <span className={`${config.text} leading-tight font-bold`}>Gestión</span>
                    <span className={`${config.text} text-brand leading-tight font-bold`}>
                        de Turnos
                    </span>
                </div>
            )}
        </div>
    )
}
