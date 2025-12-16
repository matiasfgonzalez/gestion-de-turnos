"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            theme="system"
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-muted",
                    actionButton:
                        "group-[.toast]:bg-brand group-[.toast]:text-white",
                    cancelButton:
                        "group-[.toast]:bg-input group-[.toast]:text-muted"
                }
            }}
            {...props}
        />
    );
};

export { Toaster };
