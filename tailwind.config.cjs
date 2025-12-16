/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    'Inter',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica Neue',
                    'Arial',
                    'sans-serif',
                ],
            },
            colors: {
                background: {
                    DEFAULT: 'var(--background)',
                    subtle: 'var(--background-subtle)',
                },
                foreground: 'var(--foreground)',
                brand: {
                    DEFAULT: 'var(--brand)',
                    hover: 'var(--brand-hover)',
                    light: 'var(--brand-light)',
                    dark: 'var(--brand-dark)',
                },
                accent: {
                    DEFAULT: 'var(--accent)',
                    hover: 'var(--accent-hover)',
                    light: 'var(--accent-light)',
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    hover: 'var(--secondary-hover)',
                },
                card: {
                    DEFAULT: 'var(--card)',
                    hover: 'var(--card-hover)',
                    elevated: 'var(--card-elevated)',
                },
                border: {
                    DEFAULT: 'var(--border)',
                    hover: 'var(--border-hover)',
                },
                input: {
                    DEFAULT: 'var(--input)',
                    focus: 'var(--input-focus)',
                },
                success: {
                    DEFAULT: 'var(--success)',
                    hover: 'var(--success-hover)',
                    light: 'var(--success-light)',
                },
                warning: {
                    DEFAULT: 'var(--warning)',
                    hover: 'var(--warning-hover)',
                    light: 'var(--warning-light)',
                },
                danger: {
                    DEFAULT: 'var(--danger)',
                    hover: 'var(--danger-hover)',
                    light: 'var(--danger-light)',
                },
                info: {
                    DEFAULT: 'var(--info)',
                    light: 'var(--info-light)',
                },
                muted: {
                    DEFAULT: 'var(--muted-foreground)',
                    foreground: 'var(--muted-foreground)',
                },
                gradient: {
                    start: 'var(--gradient-start)',
                    middle: 'var(--gradient-middle)',
                    end: 'var(--gradient-end)',
                },
            },
            borderRadius: {
                sm: 'var(--radius-sm)',
                DEFAULT: 'var(--radius)',
                lg: 'var(--radius-lg)',
                xl: 'var(--radius-xl)',
                '2xl': 'var(--radius-2xl)',
            },
            boxShadow: {
                xs: 'var(--shadow-xs)',
                sm: 'var(--shadow-sm)',
                DEFAULT: 'var(--shadow)',
                md: 'var(--shadow-md)',
                lg: 'var(--shadow-lg)',
                xl: 'var(--shadow-xl)',
                glow: 'var(--shadow-glow)',
            },
            container: {
                center: true,
                padding: '1rem',
            },
            animation: {
                'fade-in': 'fadeIn 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                float: 'float 4s ease-in-out infinite',
                shimmer: 'shimmer 2s ease-in-out infinite',
                gradient: 'gradient 6s ease infinite',
            },
        },
    },
    plugins: [],
}
