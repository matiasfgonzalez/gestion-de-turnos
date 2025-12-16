"use client";
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [dark, setDark] = useState<boolean>(() => {
        try {
            return localStorage.getItem("theme") === "dark";
        } catch {
            return false;
        }
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        if (dark) root.classList.add("dark");
        else root.classList.remove("dark");
        try {
            localStorage.setItem("theme", dark ? "dark" : "light");
        } catch {}
    }, [dark]);

    if (!mounted) {
        return <div className="w-10 h-10 rounded-lg border bg-card" />;
    }

    return (
        <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            className="relative w-10 h-10 rounded-lg border bg-card hover:bg-card-hover transition-all flex items-center justify-center group"
        >
            <div className="relative w-5 h-5">
                {/* Sun icon */}
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`absolute inset-0 transition-all duration-300 ${
                        dark
                            ? "rotate-90 scale-0 opacity-0"
                            : "rotate-0 scale-100 opacity-100"
                    }`}
                >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
                {/* Moon icon */}
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`absolute inset-0 transition-all duration-300 ${
                        dark
                            ? "rotate-0 scale-100 opacity-100"
                            : "-rotate-90 scale-0 opacity-0"
                    }`}
                >
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
            </div>
        </button>
    );
}
