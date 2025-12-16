/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    "Inter",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "Roboto",
                    "Helvetica Neue",
                    "Arial",
                    "sans-serif"
                ]
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                brand: {
                    DEFAULT: "var(--brand)",
                    hover: "var(--brand-hover)"
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    hover: "var(--accent-hover)"
                },
                card: {
                    DEFAULT: "var(--card)",
                    hover: "var(--card-hover)"
                },
                border: "var(--border)",
                input: "var(--input)",
                success: {
                    DEFAULT: "var(--success)",
                    hover: "var(--success-hover)"
                },
                warning: {
                    DEFAULT: "var(--warning)",
                    hover: "var(--warning-hover)"
                },
                danger: {
                    DEFAULT: "var(--danger)",
                    hover: "var(--danger-hover)"
                },
                muted: {
                    DEFAULT: "var(--muted-foreground)",
                    foreground: "var(--muted-foreground)"
                }
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                DEFAULT: "var(--radius)",
                lg: "var(--radius-lg)"
            },
            boxShadow: {
                sm: "var(--shadow-sm)",
                DEFAULT: "var(--shadow)",
                md: "var(--shadow-md)",
                lg: "var(--shadow-lg)"
            },
            container: {
                center: true,
                padding: "1rem"
            }
        }
    },
    plugins: []
};
