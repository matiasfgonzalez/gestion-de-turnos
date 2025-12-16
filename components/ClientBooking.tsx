"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Business, Booking, TimeRange, AppData } from "../lib/models";
import * as storage from "../lib/storage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { EmptyState } from "./ui/empty-state";
import { toast } from "sonner";

function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function toMinutes(t: string) {
    const [hh, mm] = t.split(":").map(Number);
    return hh * 60 + mm;
}
function fromMinutes(m: number) {
    const hh = Math.floor(m / 60);
    const mm = m % 60;
    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function range(start: number, end: number, step: number) {
    const out = [];
    for (let t = start; t + step <= end; t += step) out.push(t);
    return out;
}

export default function ClientBooking() {
    const [data, setData] = useState<AppData>({ businesses: [], bookings: [] });
    const [errors, setErrors] = useState<{ email?: string; phone?: string }>(
        {}
    );
    const [selectedBusiness, setSelectedBusiness] = useState<
        string | undefined
    >(undefined);
    const [date, setDate] = useState<string>(() => {
        const d = new Date();
        return d.toISOString().slice(0, 10);
    });
    const [duration, setDuration] = useState<number>(30);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [clientName, setClientName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [showNotificationOptions, setShowNotificationOptions] =
        useState(false);
    const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setData(storage.getAll());
        }
    }, []);

    const business = data.businesses.find((b) => b.id === selectedBusiness);

    useEffect(() => {
        if (business) {
            setDuration(business.minDuration);
        }
    }, [business]);

    const slots = useMemo(() => {
        if (!business) return [] as { time: string; price?: number }[];
        const wd = new Date(date).getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6;
        const ranges = ((business.schedule as any)[wd] as TimeRange[]) || [];
        const existing = data.bookings.filter(
            (bk) => bk.businessId === business.id && bk.date === date
        );
        const taken = existing.map((e) => ({
            s: toMinutes(e.start),
            e: toMinutes(e.end)
        }));
        const out: { time: string; price?: number }[] = [];
        for (const r of ranges) {
            const s = toMinutes(r.start);
            const e = toMinutes(r.end);
            const possible = range(s, e, duration);
            for (const startMin of possible) {
                const endMin = startMin + duration;
                const overlaps = taken.some(
                    (t) => !(endMin <= t.s || startMin >= t.e)
                );
                if (!overlaps)
                    out.push({ time: fromMinutes(startMin), price: r.price });
            }
        }
        return out;
    }, [business, date, data.bookings, duration]);

    function validateEmail(email: string) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone: string) {
        const digits = phone.replace(/[^0-9]/g, "");
        return digits.length >= 7 && digits.length <= 15;
    }

    function sendWhatsAppNotification(
        booking: Booking,
        businessData: Business
    ) {
        if (!businessData.whatsapp) {
            alert("El negocio no tiene configurado un número de WhatsApp");
            return;
        }

        // Limpiar el número de WhatsApp (remover espacios, guiones, etc)
        const phoneNumber = businessData.whatsapp.replace(/[^0-9+]/g, "");

        const message = encodeURIComponent(
            `📅 *Nuevo turno reservado*\n\n` +
                `Negocio: ${businessData.name}\n` +
                `Cliente: ${booking.clientName}\n` +
                `Fecha: ${booking.date}\n` +
                `Hora: ${booking.start}\n` +
                `Duración: ${booking.duration} min\n` +
                (booking.price !== undefined
                    ? `Precio: ${businessData.currency || "$"}${
                          booking.price
                      }\n`
                    : "Precio: Gratis\n") +
                (booking.clientEmail ? `Email: ${booking.clientEmail}\n` : "") +
                (booking.clientPhone ? `Teléfono: ${booking.clientPhone}` : "")
        );

        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    }

    function sendEmailNotification(booking: Booking, businessData: Business) {
        if (!businessData.email) {
            alert("El negocio no tiene configurado un email");
            return;
        }

        const subject = encodeURIComponent(
            `Nuevo turno reservado - ${businessData.name}`
        );
        const body = encodeURIComponent(
            `Nuevo turno reservado\n\n` +
                `Negocio: ${businessData.name}\n` +
                `Cliente: ${booking.clientName}\n` +
                `Fecha: ${booking.date}\n` +
                `Hora: ${booking.start}\n` +
                `Duración: ${booking.duration} minutos\n` +
                (booking.price !== undefined
                    ? `Precio: ${businessData.currency || "$"}${
                          booking.price
                      }\n`
                    : "Precio: Gratis\n") +
                (booking.clientEmail
                    ? `Email del cliente: ${booking.clientEmail}\n`
                    : "") +
                (booking.clientPhone
                    ? `Teléfono del cliente: ${booking.clientPhone}`
                    : "")
        );

        window.location.href = `mailto:${businessData.email}?subject=${subject}&body=${body}`;
    }

    function reserve() {
        if (!business || !selectedSlot) return;
        if (!clientName.trim()) {
            alert("Por favor ingresa tu nombre");
            return;
        }
        const newErrors: { email?: string; phone?: string } = {};
        if (clientEmail && !validateEmail(clientEmail))
            newErrors.email = "Email inválido";
        if (clientPhone && !validatePhone(clientPhone))
            newErrors.phone = "Teléfono inválido";
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        // double-check slot still available
        const latest = storage.getAll();
        const stillFree = !latest.bookings.some(
            (bk) =>
                bk.businessId === business.id &&
                bk.date === date &&
                bk.start === selectedSlot
        );
        if (!stillFree) {
            toast.error("El horario ya fue reservado. Por favor elige otro.");
            setData(latest);
            setSelectedSlot(null);
            return;
        }

        // Find the price for the selected slot
        const selectedSlotData = slots.find((s) => s.time === selectedSlot);
        const slotPrice = selectedSlotData?.price;

        const ok = confirm(
            `¿Confirmar reserva para ${clientName} el ${date} a las ${selectedSlot}?`
        );
        if (!ok) return;

        const b: Booking = {
            id: uid(),
            businessId: business.id,
            date,
            start: selectedSlot,
            duration,
            end: (() => {
                const m = toMinutes(selectedSlot) + duration;
                return fromMinutes(m);
            })(),
            clientName,
            clientEmail,
            clientPhone,
            price: slotPrice
        };
        storage.addBooking(b);
        setData(storage.getAll());
        setCurrentBooking(b);

        // Mostrar opciones de notificación si el negocio tiene email o WhatsApp
        if (business.email || business.whatsapp) {
            setShowNotificationOptions(true);
        } else {
            toast.success("✓ Turno reservado exitosamente");
        }

        // Reset form
        setSelectedSlot(null);
        setClientName("");
        setClientEmail("");
        setClientPhone("");
    }

    function closeNotificationModal() {
        setShowNotificationOptions(false);
        setCurrentBooking(null);
        toast.success("✓ Turno reservado exitosamente");
    }

    const step = !selectedBusiness || !business ? 1 : !selectedSlot ? 2 : 3;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="container py-8"
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-4xl mx-auto mb-8"
            >
                <h2 className="text-3xl font-bold tracking-tight mb-2">
                    Reservar Turno
                </h2>
                <p className="text-muted">
                    Completa los pasos para agendar tu turno
                </p>
            </motion.div>

            {/* Progress Steps */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-4xl mx-auto mb-8"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all shadow-sm ${
                                step >= 1
                                    ? "bg-brand text-white"
                                    : "bg-input text-muted"
                            }`}
                        >
                            1
                        </motion.div>
                        <span
                            className={`text-sm font-medium ${
                                step >= 1 ? "text-foreground" : "text-muted"
                            }`}
                        >
                            Seleccionar
                        </span>
                    </div>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.4 }}
                        className={`flex-1 h-1 mx-4 rounded-full transition-colors ${
                            step >= 2 ? "bg-brand" : "bg-border"
                        }`}
                    />
                    <div className="flex items-center gap-2">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all shadow-sm ${
                                step >= 2
                                    ? "bg-brand text-white"
                                    : "bg-input text-muted"
                            }`}
                        >
                            2
                        </motion.div>
                        <span
                            className={`text-sm font-medium ${
                                step >= 2 ? "text-foreground" : "text-muted"
                            }`}
                        >
                            Horario
                        </span>
                    </div>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6 }}
                        className={`flex-1 h-1 mx-4 rounded-full transition-colors ${
                            step >= 3 ? "bg-brand" : "bg-border"
                        }`}
                    />
                    <div className="flex items-center gap-2">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.7, type: "spring" }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all shadow-sm ${
                                step >= 3
                                    ? "bg-brand text-white"
                                    : "bg-input text-muted"
                            }`}
                        >
                            3
                        </motion.div>
                        <span
                            className={`text-sm font-medium ${
                                step >= 3 ? "text-foreground" : "text-muted"
                            }`}
                        >
                            Confirmar
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Panel - Configuration */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="md:col-span-1 space-y-4"
                >
                    <Card className="p-6 space-y-4">
                        <div>
                            <Label htmlFor="business">Negocio</Label>
                            <select
                                id="business"
                                className="input w-full mt-1.5"
                                value={selectedBusiness || ""}
                                onChange={(e) => {
                                    setSelectedBusiness(
                                        e.target.value || undefined
                                    );
                                    setSelectedSlot(null);
                                }}
                            >
                                <option value="">Seleccionar negocio</option>
                                {data.businesses.map((b) => (
                                    <option key={b.id} value={b.id}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="date">Fecha</Label>
                            <Input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value);
                                    setSelectedSlot(null);
                                }}
                                className="mt-1.5"
                            />
                        </div>

                        {business && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <Label htmlFor="duration">
                                    Duración (minutos)
                                </Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    value={duration}
                                    min={business.minDuration}
                                    max={business.maxDuration}
                                    onChange={(e) => {
                                        setDuration(Number(e.target.value));
                                        setSelectedSlot(null);
                                    }}
                                    className="mt-1.5"
                                />
                                <p className="text-xs text-muted mt-1.5">
                                    Entre {business.minDuration} y{" "}
                                    {business.maxDuration} minutos
                                </p>
                            </motion.div>
                        )}
                    </Card>

                    {/* Contact Info */}
                    {selectedSlot && (
                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <Card className="p-6 space-y-4">
                                    <h3 className="font-semibold text-lg">
                                        Tus datos
                                    </h3>
                                    <div>
                                        <Label htmlFor="clientName">
                                            Nombre completo{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="clientName"
                                            value={clientName}
                                            onChange={(e) =>
                                                setClientName(e.target.value)
                                            }
                                            placeholder="Tu nombre"
                                            className="mt-1.5"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="clientEmail">
                                            Email (opcional)
                                        </Label>
                                        <Input
                                            id="clientEmail"
                                            type="email"
                                            value={clientEmail}
                                            onChange={(e) =>
                                                setClientEmail(e.target.value)
                                            }
                                            placeholder="tu@email.com"
                                            className="mt-1.5"
                                        />
                                        {errors.email && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-xs text-danger mt-1.5"
                                            >
                                                {errors.email}
                                            </motion.p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="clientPhone">
                                            Teléfono (opcional)
                                        </Label>
                                        <Input
                                            id="clientPhone"
                                            type="tel"
                                            value={clientPhone}
                                            onChange={(e) =>
                                                setClientPhone(e.target.value)
                                            }
                                            placeholder="+54 9 11 1234 5678"
                                            className="mt-1.5"
                                        />
                                        {errors.phone && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-xs text-danger mt-1.5"
                                            >
                                                {errors.phone}
                                            </motion.p>
                                        )}
                                    </div>
                                </Card>
                            </motion.div>
                        </AnimatePresence>
                    )}
                </motion.div>

                {/* Right Panel - Slots & Confirmation */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-2"
                >
                    <Card className="p-6 min-h-[500px]">
                        {!business ? (
                            <EmptyState
                                icon={
                                    <svg
                                        width="48"
                                        height="48"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-muted"
                                    >
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                        <polyline points="9 22 9 12 15 12 15 22" />
                                    </svg>
                                }
                                title="Selecciona un negocio para comenzar"
                                description="Elige un negocio del menú lateral para ver los horarios disponibles"
                            />
                        ) : !selectedSlot ? (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-xl">
                                            Horarios disponibles
                                        </h3>
                                        <p className="text-sm text-muted mt-1">
                                            Selecciona el horario que mejor te
                                            convenga
                                        </p>
                                    </div>
                                    {slots.length > 0 && (
                                        <Badge variant="secondary">
                                            {slots.length} disponibles
                                        </Badge>
                                    )}
                                </div>
                                {slots.length === 0 ? (
                                    <EmptyState
                                        icon={
                                            <svg
                                                width="48"
                                                height="48"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-muted"
                                            >
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                />
                                                <polyline points="12 6 12 12 16 14" />
                                            </svg>
                                        }
                                        title="No hay horarios disponibles"
                                        description="Prueba con otra fecha o duración diferente"
                                    />
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3"
                                    >
                                        {slots.map((slot, index) => (
                                            <motion.div
                                                key={slot.time}
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.8
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1
                                                }}
                                                transition={{
                                                    delay: index * 0.03,
                                                    duration: 0.2
                                                }}
                                            >
                                                <Button
                                                    variant="secondary"
                                                    onClick={() =>
                                                        setSelectedSlot(
                                                            slot.time
                                                        )
                                                    }
                                                    className="w-full py-6 hover:bg-brand hover:text-white hover:border-brand flex flex-col items-center gap-1.5 h-auto"
                                                >
                                                    <span className="font-semibold text-base">
                                                        {slot.time}
                                                    </span>
                                                    {slot.price !==
                                                        undefined && (
                                                        <span className="text-xs opacity-80">
                                                            {business.currency ||
                                                                "$"}
                                                            {slot.price}
                                                        </span>
                                                    )}
                                                    {slot.price ===
                                                        undefined && (
                                                        <Badge
                                                            variant="success"
                                                            className="text-[10px]"
                                                        >
                                                            Gratis
                                                        </Badge>
                                                    )}
                                                </Button>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between pb-4 border-b">
                                    <h3 className="font-semibold text-xl">
                                        Confirmar reserva
                                    </h3>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedSlot(null)}
                                    >
                                        Cambiar horario
                                    </Button>
                                </div>

                                {/* Booking Summary */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="p-6 rounded-xl bg-brand/5 border border-brand/20">
                                        <div className="space-y-4">
                                            <div className="flex items-start justify-between">
                                                <span className="text-sm text-muted">
                                                    Negocio
                                                </span>
                                                <span className="font-semibold text-right">
                                                    {business.name}
                                                </span>
                                            </div>
                                            <div className="flex items-start justify-between">
                                                <span className="text-sm text-muted">
                                                    Fecha
                                                </span>
                                                <span className="font-semibold text-right">
                                                    {new Date(
                                                        date + "T00:00"
                                                    ).toLocaleDateString("es", {
                                                        weekday: "long",
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric"
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-start justify-between">
                                                <span className="text-sm text-muted">
                                                    Horario
                                                </span>
                                                <span className="font-semibold text-right text-lg">
                                                    {selectedSlot}
                                                </span>
                                            </div>
                                            <div className="flex items-start justify-between">
                                                <span className="text-sm text-muted">
                                                    Duración
                                                </span>
                                                <span className="font-semibold text-right">
                                                    {duration} minutos
                                                </span>
                                            </div>
                                            <div className="flex items-start justify-between pt-3 border-t border-brand/20">
                                                <span className="text-sm font-medium text-muted">
                                                    Precio
                                                </span>
                                                <span className="font-bold text-brand text-lg">
                                                    {(() => {
                                                        const slot = slots.find(
                                                            (s) =>
                                                                s.time ===
                                                                selectedSlot
                                                        );
                                                        if (
                                                            slot?.price !==
                                                            undefined
                                                        ) {
                                                            return `${
                                                                business.currency ||
                                                                "$"
                                                            }${slot.price}`;
                                                        }
                                                        return "Gratis";
                                                    })()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Button
                                        variant="success"
                                        onClick={reserve}
                                        disabled={!clientName.trim()}
                                        size="lg"
                                        className="w-full text-base gap-2"
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
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Confirmar reserva
                                    </Button>
                                </motion.div>
                            </motion.div>
                        )}
                    </Card>
                </motion.div>
            </div>

            {/* Notification Modal */}
            <AnimatePresence>
                {showNotificationOptions && currentBooking && business && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={closeNotificationModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Card className="max-w-md w-full p-8 space-y-6">
                                <div className="text-center space-y-3">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            delay: 0.1,
                                            type: "spring"
                                        }}
                                        className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center"
                                    >
                                        <svg
                                            width="32"
                                            height="32"
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
                                    </motion.div>
                                    <h3 className="text-2xl font-bold">
                                        ✓ Turno reservado
                                    </h3>
                                    <p className="text-muted">
                                        Ahora puedes notificar al negocio
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {business.whatsapp && (
                                        <Button
                                            variant="whatsapp"
                                            size="lg"
                                            onClick={() => {
                                                sendWhatsAppNotification(
                                                    currentBooking,
                                                    business
                                                );
                                                closeNotificationModal();
                                            }}
                                            className="w-full gap-2"
                                        >
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                            Enviar por WhatsApp
                                        </Button>
                                    )}

                                    {business.email && (
                                        <Button
                                            variant="secondary"
                                            size="lg"
                                            onClick={() => {
                                                sendEmailNotification(
                                                    currentBooking,
                                                    business
                                                );
                                                closeNotificationModal();
                                            }}
                                            className="w-full gap-2"
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
                                                    x="2"
                                                    y="4"
                                                    width="20"
                                                    height="16"
                                                    rx="2"
                                                />
                                                <path d="M22 6l-10 7L2 6" />
                                            </svg>
                                            Enviar por Email
                                        </Button>
                                    )}

                                    {!business.whatsapp && !business.email && (
                                        <p className="text-center text-muted text-sm">
                                            El negocio no tiene configurados
                                            canales de notificación
                                        </p>
                                    )}
                                </div>

                                <Button
                                    variant="ghost"
                                    onClick={closeNotificationModal}
                                    className="w-full"
                                >
                                    Cerrar
                                </Button>
                            </Card>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
