"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
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
            >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        ),
        title: "Gestión Inteligente",
        description:
            "Configura horarios personalizados, duraciones de turnos y precios. Control total sobre la disponibilidad de tu negocio.",
        color: "bg-brand"
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
            >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        title: "Reservas en Tiempo Real",
        description:
            "Tus clientes ven disponibilidad actualizada al instante. Sin dobles reservas, sin confusiones.",
        color: "bg-cyan-500"
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
            >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        title: "100% Privado",
        description:
            "Tus datos nunca salen de tu navegador. Sin servidores externos, sin riesgos de seguridad.",
        color: "bg-accent"
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
            >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
        ),
        title: "Notificaciones Automáticas",
        description:
            "Recibe confirmaciones por WhatsApp o email cuando un cliente reserva un turno.",
        color: "bg-warning"
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
            >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
        ),
        title: "Diseño Responsive",
        description:
            "Funciona perfectamente en móviles, tablets y escritorio. Interfaz moderna y fácil de usar.",
        color: "bg-blue-500"
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
            >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
        ),
        title: "Estadísticas Claras",
        description:
            "Visualiza turnos totales, próximas citas e ingresos desde tu panel de administración.",
        color: "bg-orange-500"
    }
];

const steps = [
    {
        number: 1,
        title: "Elige tu Negocio",
        description:
            "Selecciona el servicio que necesitas de la lista disponible"
    },
    {
        number: 2,
        title: "Selecciona Fecha y Hora",
        description:
            "Ve horarios disponibles en tiempo real y elige el que mejor te convenga"
    },
    {
        number: 3,
        title: "Confirma tu Reserva",
        description: "Completa tus datos y recibe confirmación inmediata"
    }
];

const adminFeatures = [
    "Crea y gestiona múltiples negocios",
    "Configura horarios personalizados por día",
    "Define precios por rango horario",
    "Visualiza estadísticas e ingresos",
    "Cancela o modifica turnos fácilmente",
    "Recibe notificaciones por WhatsApp o email"
];

const benefits = [
    {
        title: "Configuración Rápida",
        description:
            "Comienza en minutos, sin instalación ni configuración compleja",
        color: "bg-brand"
    },
    {
        title: "Sin Costos Ocultos",
        description: "100% gratuito, sin planes premium ni cargos mensuales",
        color: "bg-success"
    },
    {
        title: "Tecnología Moderna",
        description: "Construido con Next.js 15 y las últimas tecnologías web",
        color: "bg-accent"
    },
    {
        title: "Fácil de Usar",
        description: "Interfaz intuitiva que no requiere entrenamiento previo",
        color: "bg-cyan-500"
    }
];

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-brand/5 via-transparent to-accent/5 dark:from-brand/10 dark:to-accent/10" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-cyan-50/50 to-transparent dark:from-cyan-950/20 dark:to-transparent" />

                <div className="container relative py-16 lg:py-24">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left content */}
                        <motion.div
                            initial="initial"
                            animate="animate"
                            variants={stagger}
                            className="space-y-8"
                        >
                            {/* Badge */}
                            <motion.div variants={fadeInUp}>
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-card/80 backdrop-blur-sm text-sm font-medium">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                                    </span>
                                    Sistema 100% Local y Privado
                                </span>
                            </motion.div>

                            {/* Title */}
                            <motion.div
                                variants={fadeInUp}
                                className="space-y-4"
                            >
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                                    Gestiona Turnos{" "}
                                    <br className="hidden sm:block" />
                                    de Forma{" "}
                                    <span className="bg-linear-to-r from-brand via-cyan-500 to-accent bg-clip-text text-transparent">
                                        Simple y Profesional
                                    </span>
                                </h1>
                                <p className="text-lg text-muted max-w-lg">
                                    Sistema completo de reservas para tu
                                    negocio. Sin servidores, sin complicaciones.
                                    Tus datos permanecen 100% privados en tu
                                    navegador.
                                </p>
                            </motion.div>

                            {/* CTAs */}
                            <motion.div
                                variants={fadeInUp}
                                className="flex flex-wrap gap-4"
                            >
                                <Link href="/client">
                                    <Button size="lg" className="gap-2">
                                        Reservar Turno
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <line
                                                x1="5"
                                                y1="12"
                                                x2="19"
                                                y2="12"
                                            />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </Button>
                                </Link>
                                <Link href="/admin">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="gap-2"
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <circle cx="12" cy="12" r="3" />
                                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                        </svg>
                                        Panel Admin
                                    </Button>
                                </Link>
                            </motion.div>

                            {/* Trust indicators */}
                            <motion.div
                                variants={fadeInUp}
                                className="flex flex-wrap items-center gap-6 text-sm text-muted"
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
                                    <span>Sin registro requerido</span>
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
                                    <span>Sin costo oculto</span>
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
                                    <span>Control total de tus datos</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right content - Hero image placeholder */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative">
                                {/* Main image card */}
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 aspect-4/3">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center space-y-4 p-8">
                                            <div className="w-20 h-20 mx-auto rounded-2xl bg-brand/10 flex items-center justify-center">
                                                <svg
                                                    width="40"
                                                    height="40"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    className="text-brand"
                                                >
                                                    <rect
                                                        x="3"
                                                        y="4"
                                                        width="18"
                                                        height="18"
                                                        rx="2"
                                                        ry="2"
                                                    />
                                                    <line
                                                        x1="16"
                                                        y1="2"
                                                        x2="16"
                                                        y2="6"
                                                    />
                                                    <line
                                                        x1="8"
                                                        y1="2"
                                                        x2="8"
                                                        y2="6"
                                                    />
                                                    <line
                                                        x1="3"
                                                        y1="10"
                                                        x2="21"
                                                        y2="10"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="text-sm text-muted">
                                                Vista previa del sistema
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating badge */}
                                <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-lg border p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-success flex items-center justify-center">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="2"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground">
                                            24/7
                                        </p>
                                        <p className="text-xs text-muted">
                                            Disponible
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 lg:py-28 bg-card/30">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center space-y-4 mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Todo lo que Necesitas en un Solo Lugar
                        </h2>
                        <p className="text-muted max-w-2xl mx-auto">
                            Sistema completo de gestión de turnos diseñado para
                            simplificar tu día a día
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                                    <div
                                        className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform`}
                                    >
                                        {feature.icon}
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-muted leading-relaxed">
                                        {feature.description}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works - Client */}
            <section className="py-20 lg:py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-cyan-50/50 to-transparent dark:from-cyan-950/20 dark:to-transparent" />

                <div className="container relative">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Image side */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-xl border bg-linear-to-br from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50 aspect-4/3">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center space-y-4 p-8">
                                        <div className="w-16 h-16 mx-auto rounded-xl bg-brand/20 flex items-center justify-center">
                                            <svg
                                                width="32"
                                                height="32"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                className="text-brand"
                                            >
                                                <rect
                                                    x="3"
                                                    y="4"
                                                    width="18"
                                                    height="18"
                                                    rx="2"
                                                    ry="2"
                                                />
                                                <line
                                                    x1="16"
                                                    y1="2"
                                                    x2="16"
                                                    y2="6"
                                                />
                                                <line
                                                    x1="8"
                                                    y1="2"
                                                    x2="8"
                                                    y2="6"
                                                />
                                                <line
                                                    x1="3"
                                                    y1="10"
                                                    x2="21"
                                                    y2="10"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-sm text-muted">
                                            Calendario interactivo
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating price badge */}
                            <div className="absolute -top-4 -right-4 bg-card rounded-xl shadow-lg border p-4 text-center">
                                <p className="text-2xl font-bold text-success">
                                    0€
                                </p>
                                <p className="text-xs text-muted">
                                    Costo mensual
                                </p>
                            </div>
                        </motion.div>

                        {/* Content side */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="inline-block px-4 py-2 rounded-full bg-success text-white text-sm font-medium">
                                Para Clientes
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold">
                                Reserva tu Turno en 3 Pasos
                            </h2>
                            <p className="text-muted">
                                Sistema de reservas intuitivo que tus clientes
                                adorarán usar
                            </p>

                            <div className="space-y-6">
                                {steps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15 }}
                                        className="flex gap-4"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold shrink-0">
                                            {step.number}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">
                                                {step.title}
                                            </h4>
                                            <p className="text-sm text-muted">
                                                {step.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <Link href="/client">
                                <Button size="lg" className="gap-2">
                                    Comenzar Ahora
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
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Admin Panel Section */}
            <section className="py-20 lg:py-28 bg-linear-to-b from-gray-900 to-gray-950 text-white">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Content side */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="inline-block px-4 py-2 rounded-full bg-accent text-white text-sm font-medium">
                                Para Administradores
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold">
                                Panel de Control Completo
                            </h2>
                            <p className="text-gray-400">
                                Gestiona todos los aspectos de tu negocio desde
                                un único lugar
                            </p>

                            <div className="space-y-4">
                                {adminFeatures.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center shrink-0">
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="3"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <span>{feature}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/admin">
                                    <Button size="lg" className="gap-2">
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <circle cx="12" cy="12" r="3" />
                                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                        </svg>
                                        Acceder al Panel
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Image side */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700 bg-linear-to-br from-gray-800 to-gray-900 aspect-4/3">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center space-y-4 p-8">
                                        <div className="w-16 h-16 mx-auto rounded-xl bg-accent/20 flex items-center justify-center">
                                            <svg
                                                width="32"
                                                height="32"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                className="text-accent"
                                            >
                                                <rect
                                                    x="3"
                                                    y="3"
                                                    width="7"
                                                    height="7"
                                                />
                                                <rect
                                                    x="14"
                                                    y="3"
                                                    width="7"
                                                    height="7"
                                                />
                                                <rect
                                                    x="14"
                                                    y="14"
                                                    width="7"
                                                    height="7"
                                                />
                                                <rect
                                                    x="3"
                                                    y="14"
                                                    width="7"
                                                    height="7"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-sm text-gray-400">
                                            Panel de administración
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating badge */}
                            <div className="absolute -bottom-4 -left-4 bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-brand flex items-center justify-center">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="2"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">
                                        Gestión
                                    </p>
                                    <p className="font-bold">Eficiente</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 lg:py-28 bg-linear-to-b from-gray-950 to-gray-900 text-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center space-y-4 mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold">
                            ¿Por Qué Elegir Nuestro Sistema?
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Ventajas que te ayudarán a trabajar más
                            inteligentemente
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="p-6 h-full bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-colors">
                                    <div
                                        className={`w-12 h-12 rounded-xl ${benefit.color} mb-4`}
                                    />
                                    <h3 className="font-semibold text-lg mb-2 text-white">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 lg:py-20">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="p-8 md:p-12 text-center space-y-6 bg-linear-to-br from-gray-900 to-gray-800 border-gray-700">
                            <h2 className="text-2xl md:text-3xl font-bold text-white">
                                ¿Listo para Simplificar tu Gestión de Turnos?
                            </h2>
                            <p className="text-gray-400 max-w-lg mx-auto">
                                Únete a cientos de negocios que ya confían en
                                nuestro sistema para gestionar sus reservas
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 pt-2">
                                <Link href="/client">
                                    <Button size="lg" className="gap-2">
                                        Reservar un Turno
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <line
                                                x1="5"
                                                y1="12"
                                                x2="19"
                                                y2="12"
                                            />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </Button>
                                </Link>
                                <Link href="/admin">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="gap-2 border-gray-600 text-white hover:bg-gray-700"
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <circle cx="12" cy="12" r="3" />
                                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                        </svg>
                                        Acceder como Admin
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
