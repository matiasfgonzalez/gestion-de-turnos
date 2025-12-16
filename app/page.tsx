export default function Home() {
    return (
        <div className="container py-16 md:py-24">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-card text-sm">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-muted">
                        Sistema 100% local - Sin servidor
                    </span>
                </div>

                {/* Headline */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Gestión de Turnos{" "}
                        <span className="bg-linear-to-r from-brand to-accent bg-clip-text text-transparent">
                            Profesional
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
                        Configura horarios para tus negocios y permite que
                        clientes reserven turnos fácilmente. Interfaz moderna,
                        intuitiva y totalmente local.
                    </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <a
                        href="/client"
                        className="btn btn-primary w-full sm:w-auto text-base px-8 py-3"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect
                                x="3"
                                y="4"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                            />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Reservar turno
                    </a>
                    <a
                        href="/admin"
                        className="btn btn-secondary w-full sm:w-auto text-base px-8 py-3"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20 7h-9M14 17H5M17 3v18M10 17l-3-3 3-3" />
                        </svg>
                        Administrar negocio
                    </a>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
                    <div className="card p-6 space-y-3 card-hover">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-brand/10 to-brand/5 flex items-center justify-center">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-brand"
                            >
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <h3 className="font-semibold">Sin costos ocultos</h3>
                        <p className="text-sm text-muted">
                            Todo funciona localmente en tu navegador. Sin
                            servidores, sin suscripciones.
                        </p>
                    </div>

                    <div className="card p-6 space-y-3 card-hover">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-accent"
                            >
                                <rect
                                    x="3"
                                    y="11"
                                    width="18"
                                    height="11"
                                    rx="2"
                                    ry="2"
                                />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <h3 className="font-semibold">Privacidad total</h3>
                        <p className="text-sm text-muted">
                            Tus datos nunca salen de tu dispositivo. Control
                            absoluto de tu información.
                        </p>
                    </div>

                    <div className="card p-6 space-y-3 card-hover">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-success/10 to-success/5 flex items-center justify-center">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-success"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h3 className="font-semibold">Fácil de usar</h3>
                        <p className="text-sm text-muted">
                            Interfaz intuitiva y moderna. Configura tu negocio
                            en minutos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
