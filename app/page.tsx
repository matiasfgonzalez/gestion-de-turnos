"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
};

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const features = [
    {
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-brand"
            >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
        title: "Sin costos ocultos",
        description:
            "Todo funciona localmente en tu navegador. Sin servidores, sin suscripciones mensuales.",
        gradient: "from-brand/20 to-brand/5"
    },
    {
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-accent"
            >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
        title: "Privacidad total",
        description:
            "Tus datos nunca salen de tu dispositivo. Control absoluto de tu información.",
        gradient: "from-accent/20 to-accent/5"
    },
    {
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-success"
            >
                <polyline points="20 6 9 17 4 12" />
            </svg>
        ),
        title: "Fácil de usar",
        description:
            "Interfaz intuitiva y moderna. Configura tu negocio en minutos.",
        gradient: "from-success/20 to-success/5"
    }
];

const steps = [
    {
        number: "01",
        title: "Crea tu negocio",
        description: "Configura nombre, horarios y duración de turnos"
    },
    {
        number: "02",
        title: "Comparte el link",
        description: "Tus clientes acceden desde cualquier dispositivo"
    },
    {
        number: "03",
        title: "Recibe reservas",
        description: "Gestiona todos los turnos desde un solo lugar"
    }
];

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <motion.section
                initial="initial"
                animate="animate"
                variants={stagger}
                className="container py-16 md:py-24 lg:py-32"
            >
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Badge */}
                    <motion.div
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-card/50 backdrop-blur-sm text-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                        </span>
                        <span className="text-muted">
                            Sistema 100% local — Sin servidor requerido
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.div variants={fadeInUp} className="space-y-6">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                            Gestión de Turnos{" "}
                            <span className="relative">
                                <span className="bg-gradient-to-r from-brand via-accent to-brand bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                    Profesional
                                </span>
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                            Configura horarios para tus negocios y permite que
                            tus clientes reserven turnos fácilmente. Moderno,
                            intuitivo y completamente privado.
                        </p>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                        <Link href="/client">
                            <Button
                                variant="secondary"
                                size="lg"
                                className="w-full sm:w-auto min-w-50"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
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
                            </Button>
                        </Link>
                        <Link href="/admin">
                            <Button
                                variant="secondary"
                                size="lg"
                                className="w-full sm:w-auto min-w-50"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                </svg>
                                Panel de administración
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Social proof / mini stats */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex items-center justify-center gap-8 pt-8 text-sm text-muted"
                    >
                        <div className="flex items-center gap-2">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-success"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Gratis para siempre</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-success"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Sin registro</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-success"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>100% privado</span>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Features Section */}
            <section className="container py-16 md:py-24">
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={stagger}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            whileHover={{
                                y: -4,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <Card className="p-6 h-full space-y-4 border-2 border-transparent hover:border-brand/20 transition-colors">
                                <div
                                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}
                                >
                                    {feature.icon}
                                </div>
                                <h3 className="font-semibold text-lg">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-muted leading-relaxed">
                                    {feature.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* How it works */}
            <section className="container py-16 md:py-24">
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={stagger}
                    className="max-w-4xl mx-auto"
                >
                    <motion.div
                        variants={fadeInUp}
                        className="text-center space-y-4 mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Cómo funciona
                        </h2>
                        <p className="text-muted max-w-lg mx-auto">
                            En solo 3 simples pasos, tendrás tu sistema de
                            turnos funcionando
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="relative text-center space-y-4"
                            >
                                {/* Connector line */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-border to-transparent" />
                                )}

                                <div className="relative inline-flex">
                                    <span className="text-5xl font-bold text-brand/20">
                                        {step.number}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-lg">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-muted">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* CTA Section */}
            <section className="container py-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="p-8 md:p-12 text-center space-y-6 bg-gradient-to-br from-brand/5 via-transparent to-accent/5 border-2 border-brand/10">
                        <h2 className="text-2xl md:text-3xl font-bold">
                            ¿Listo para empezar?
                        </h2>
                        <p className="text-muted max-w-lg mx-auto">
                            Configura tu primer negocio ahora y empieza a
                            recibir reservas en minutos
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                            <Link href="/admin">
                                <Button size="lg" className="min-w-50">
                                    Comenzar ahora
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="container py-8 border-t">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
                    <p>Gestión de Turnos — Sistema local de reservas</p>
                    <div className="flex items-center gap-4">
                        <span>Hecho con ❤️ usando Next.js</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
