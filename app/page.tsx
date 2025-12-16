'use client'

import { motion } from 'framer-motion'
import { AdminCTA, AuthCTA } from '../components/AuthCTA'
import {
  CalendarIcon,
  ClockIcon,
  ShieldIcon,
  BellIcon,
  MobileIcon,
  ChartIcon,
  CheckIcon,
  GridIcon,
} from '../components/icons'
import { Card } from '../components/ui/card'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Data - moved outside component to avoid recreation on each render
const features = [
  {
    icon: CalendarIcon,
    title: 'Gestión Inteligente',
    description:
      'Configura horarios personalizados, duraciones de turnos y precios. Control total sobre la disponibilidad de tu negocio.',
    color: 'bg-brand',
  },
  {
    icon: ClockIcon,
    title: 'Reservas en Tiempo Real',
    description:
      'Tus clientes ven disponibilidad actualizada al instante. Sin dobles reservas, sin confusiones.',
    color: 'bg-cyan-500',
  },
  {
    icon: ShieldIcon,
    title: '100% Privado',
    description:
      'Tus datos nunca salen de tu navegador. Sin servidores externos, sin riesgos de seguridad.',
    color: 'bg-accent',
  },
  {
    icon: BellIcon,
    title: 'Notificaciones Automáticas',
    description: 'Recibe confirmaciones por WhatsApp o email cuando un cliente reserva un turno.',
    color: 'bg-warning',
  },
  {
    icon: MobileIcon,
    title: 'Diseño Responsive',
    description:
      'Funciona perfectamente en móviles, tablets y escritorio. Interfaz moderna y fácil de usar.',
    color: 'bg-blue-500',
  },
  {
    icon: ChartIcon,
    title: 'Estadísticas Claras',
    description:
      'Visualiza turnos totales, próximas citas e ingresos desde tu panel de administración.',
    color: 'bg-orange-500',
  },
]

const steps = [
  {
    number: 1,
    title: 'Elige tu Negocio',
    description: 'Selecciona el servicio que necesitas de la lista disponible',
  },
  {
    number: 2,
    title: 'Selecciona Fecha y Hora',
    description: 'Ve horarios disponibles en tiempo real y elige el que mejor te convenga',
  },
  {
    number: 3,
    title: 'Confirma tu Reserva',
    description: 'Completa tus datos y recibe confirmación inmediata',
  },
]

const adminFeatures = [
  'Crea y gestiona múltiples negocios',
  'Configura horarios personalizados por día',
  'Define precios por rango horario',
  'Visualiza estadísticas e ingresos',
  'Cancela o modifica turnos fácilmente',
  'Recibe notificaciones por WhatsApp o email',
]

const benefits = [
  {
    title: 'Configuración Rápida',
    description: 'Comienza en minutos, sin instalación ni configuración compleja',
    color: 'bg-brand',
  },
  {
    title: 'Sin Costos Ocultos',
    description: '100% gratuito, sin planes premium ni cargos mensuales',
    color: 'bg-success',
  },
  {
    title: 'Tecnología Moderna',
    description: 'Construido con Next.js 15 y las últimas tecnologías web',
    color: 'bg-accent',
  },
  {
    title: 'Fácil de Usar',
    description: 'Interfaz intuitiva que no requiere entrenamiento previo',
    color: 'bg-cyan-500',
  },
]

const trustIndicators = ['Sin registro requerido', 'Sin costo oculto', 'Control total de tus datos']

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="from-brand/5 to-accent/5 dark:from-brand/10 dark:to-accent/10 absolute inset-0 bg-linear-to-br via-transparent" />
        <div className="absolute top-0 right-0 h-full w-1/2 bg-linear-to-l from-cyan-50/50 to-transparent dark:from-cyan-950/20 dark:to-transparent" />

        <div className="relative container py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left content */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div variants={fadeInUp}>
                <span className="bg-card/80 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                    <span className="bg-success relative inline-flex h-2 w-2 rounded-full" />
                  </span>
                  Sistema 100% Local y Privado
                </span>
              </motion.div>

              {/* Title */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Gestiona Turnos <br className="hidden sm:block" />
                  de Forma{' '}
                  <span className="from-brand to-accent bg-linear-to-r via-cyan-500 bg-clip-text text-transparent">
                    Simple y Profesional
                  </span>
                </h1>
                <p className="text-muted max-w-lg text-lg">
                  Sistema completo de reservas para tu negocio. Sin servidores, sin complicaciones.
                  Tus datos permanecen 100% privados en tu navegador.
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeInUp}>
                <AuthCTA variant="hero" />
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                variants={fadeInUp}
                className="text-muted flex flex-wrap items-center gap-6 text-sm"
              >
                {trustIndicators.map((indicator) => (
                  <div key={indicator} className="flex items-center gap-2">
                    <CheckIcon className="text-success" />
                    <span>{indicator}</span>
                  </div>
                ))}
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
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl border bg-linear-to-br from-gray-100 to-gray-200 shadow-2xl dark:from-gray-800 dark:to-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="space-y-4 p-8 text-center">
                      <div className="bg-brand/10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl">
                        <CalendarIcon size={40} className="text-brand" />
                      </div>
                      <p className="text-muted text-sm">Vista previa del sistema</p>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="bg-card absolute -bottom-4 -left-4 flex items-center gap-3 rounded-xl border p-4 shadow-lg">
                  <div className="bg-success flex h-10 w-10 items-center justify-center rounded-lg">
                    <CheckIcon size={20} className="stroke-white" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-foreground font-bold">24/7</p>
                    <p className="text-muted text-xs">Disponible</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card/30 py-20 lg:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 space-y-4 text-center"
          >
            <h2 className="text-3xl font-bold md:text-4xl">
              Todo lo que Necesitas en un Solo Lugar
            </h2>
            <p className="text-muted mx-auto max-w-2xl">
              Sistema completo de gestión de turnos diseñado para simplificar tu día a día
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div
                    className={`h-12 w-12 rounded-xl ${feature.color} mb-4 flex items-center justify-center text-white transition-transform group-hover:scale-110`}
                  >
                    <feature.icon />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - Client */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-linear-to-r from-cyan-50/50 to-transparent dark:from-cyan-950/20 dark:to-transparent" />

        <div className="relative container">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl border bg-linear-to-br from-blue-100 to-cyan-100 shadow-xl dark:from-blue-900/50 dark:to-cyan-900/50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="space-y-4 p-8 text-center">
                    <div className="bg-brand/20 mx-auto flex h-16 w-16 items-center justify-center rounded-xl">
                      <CalendarIcon size={32} className="text-brand" />
                    </div>
                    <p className="text-muted text-sm">Calendario interactivo</p>
                  </div>
                </div>
              </div>

              {/* Floating price badge */}
              <div className="bg-card absolute -top-4 -right-4 rounded-xl border p-4 text-center shadow-lg">
                <p className="text-success text-2xl font-bold">0€</p>
                <p className="text-muted text-xs">Costo mensual</p>
              </div>
            </motion.div>

            {/* Content side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-success inline-block rounded-full px-4 py-2 text-sm font-medium text-white">
                Para Clientes
              </div>

              <h2 className="text-3xl font-bold md:text-4xl">Reserva tu Turno en 3 Pasos</h2>
              <p className="text-muted">
                Sistema de reservas intuitivo que tus clientes adorarán usar
              </p>

              <div className="space-y-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="flex gap-4"
                  >
                    <div className="bg-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white">
                      {step.number}
                    </div>
                    <div>
                      <h4 className="font-semibold">{step.title}</h4>
                      <p className="text-muted text-sm">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <AuthCTA variant="section" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Admin Panel Section */}
      <section className="bg-linear-to-b from-gray-900 to-gray-950 py-20 text-white lg:py-28">
        <div className="container">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Content side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-accent inline-block rounded-full px-4 py-2 text-sm font-medium text-white">
                Para Administradores
              </div>

              <h2 className="text-3xl font-bold md:text-4xl">Panel de Control Completo</h2>
              <p className="text-gray-400">
                Gestiona todos los aspectos de tu negocio desde un único lugar
              </p>

              <div className="space-y-4">
                {adminFeatures.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="bg-success flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      <CheckIcon size={14} className="stroke-white" strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>

              <AdminCTA />
            </motion.div>

            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-gray-700 bg-linear-to-br from-gray-800 to-gray-900 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="space-y-4 p-8 text-center">
                    <div className="bg-accent/20 mx-auto flex h-16 w-16 items-center justify-center rounded-xl">
                      <GridIcon className="text-accent" />
                    </div>
                    <p className="text-sm text-gray-400">Panel de administración</p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-800 p-4 shadow-lg">
                <div className="bg-brand flex h-10 w-10 items-center justify-center rounded-lg">
                  <CheckIcon size={20} className="stroke-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Gestión</p>
                  <p className="font-bold">Eficiente</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-linear-to-b from-gray-950 to-gray-900 py-20 text-white lg:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 space-y-4 text-center"
          >
            <h2 className="text-3xl font-bold md:text-4xl">¿Por Qué Elegir Nuestro Sistema?</h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              Ventajas que te ayudarán a trabajar más inteligentemente
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-gray-700 bg-gray-800/50 p-6 transition-colors hover:bg-gray-800">
                  <div className={`h-12 w-12 rounded-xl ${benefit.color} mb-4`} />
                  <h3 className="mb-2 text-lg font-semibold text-white">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{benefit.description}</p>
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
            <Card className="space-y-6 border-gray-700 bg-linear-to-br from-gray-900 to-gray-800 p-8 text-center md:p-12">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                ¿Listo para Simplificar tu Gestión de Turnos?
              </h2>
              <p className="mx-auto max-w-lg text-gray-400">
                Únete a cientos de negocios que ya confían en nuestro sistema para gestionar sus
                reservas
              </p>
              <AuthCTA variant="cta" />
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
