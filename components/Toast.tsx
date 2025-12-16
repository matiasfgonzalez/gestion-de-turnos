"use client";
import React, { useEffect, useState } from "react";

export default function Toast({
    message,
    onClose
}: {
    message: string | null;
    onClose: () => void;
}) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!message) {
            setIsVisible(false);
            return;
        }
        setIsVisible(true);
        const t = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 200);
        }, 3500);
        return () => clearTimeout(t);
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div
            className={`fixed right-4 bottom-4 z-50 transition-all duration-300 transform ${
                isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
            }`}
        >
            <div className="card p-4 shadow-lg flex items-center gap-3 min-w-[300px]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center flex-shrink-0">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-success"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <div className="flex-1">
                    <p className="text-sm font-medium">{message}</p>
                </div>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(onClose, 200);
                    }}
                    className="p-1 hover:bg-input rounded transition-colors"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
