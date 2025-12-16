"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Business, Booking, TimeRange, AppData } from "../lib/models";
import * as storage from "../lib/storage";
import Toast from "./Toast";

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
    const [toast, setToast] = useState<string | null>(null);
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
            alert("El horario ya fue reservado. Por favor elige otro.");
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
        setToast("✓ Turno reservado exitosamente");

        // Reset form
        setSelectedSlot(null);
        setClientName("");
        setClientEmail("");
        setClientPhone("");
    }

    const step = !selectedBusiness || !business ? 1 : !selectedSlot ? 2 : 3;

    return (
        <div className="container py-8 animate-fade-in">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-8">
                <h2 className="text-3xl font-bold tracking-tight mb-2">
                    Reservar Turno
                </h2>
                <p className="text-muted">
                    Completa los pasos para agendar tu turno
                </p>
            </div>

            {/* Progress Steps */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm transition-all ${
                                step >= 1
                                    ? "bg-brand text-white"
                                    : "bg-input text-muted"
                            }`}
                        >
                            1
                        </div>
                        <span
                            className={`text-sm font-medium ${
                                step >= 1 ? "text-foreground" : "text-muted"
                            }`}
                        >
                            Seleccionar
                        </span>
                    </div>
                    <div
                        className={`flex-1 h-0.5 mx-4 ${
                            step >= 2 ? "bg-brand" : "bg-border"
                        }`}
                    />
                    <div className="flex items-center gap-2">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm transition-all ${
                                step >= 2
                                    ? "bg-brand text-white"
                                    : "bg-input text-muted"
                            }`}
                        >
                            2
                        </div>
                        <span
                            className={`text-sm font-medium ${
                                step >= 2 ? "text-foreground" : "text-muted"
                            }`}
                        >
                            Horario
                        </span>
                    </div>
                    <div
                        className={`flex-1 h-0.5 mx-4 ${
                            step >= 3 ? "bg-brand" : "bg-border"
                        }`}
                    />
                    <div className="flex items-center gap-2">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm transition-all ${
                                step >= 3
                                    ? "bg-brand text-white"
                                    : "bg-input text-muted"
                            }`}
                        >
                            3
                        </div>
                        <span
                            className={`text-sm font-medium ${
                                step >= 3 ? "text-foreground" : "text-muted"
                            }`}
                        >
                            Confirmar
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Panel - Configuration */}
                <div className="md:col-span-1 space-y-4">
                    <div className="card p-6 space-y-4">
                        <div>
                            <label className="label">Negocio</label>
                            <select
                                className="input w-full"
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
                            <label className="label">Fecha</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value);
                                    setSelectedSlot(null);
                                }}
                                className="input w-full"
                            />
                        </div>

                        {business && (
                            <div>
                                <label className="label">
                                    Duración (minutos)
                                </label>
                                <input
                                    type="number"
                                    value={duration}
                                    min={business.minDuration}
                                    max={business.maxDuration}
                                    onChange={(e) => {
                                        setDuration(Number(e.target.value));
                                        setSelectedSlot(null);
                                    }}
                                    className="input w-full"
                                />
                                <p className="text-xs text-muted mt-1">
                                    Entre {business.minDuration} y{" "}
                                    {business.maxDuration} minutos
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Contact Info */}
                    {selectedSlot && (
                        <div className="card p-6 space-y-4">
                            <h3 className="font-semibold">Tus datos</h3>
                            <div>
                                <label className="label">
                                    Nombre completo *
                                </label>
                                <input
                                    value={clientName}
                                    onChange={(e) =>
                                        setClientName(e.target.value)
                                    }
                                    className="input w-full"
                                    placeholder="Tu nombre"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    Email (opcional)
                                </label>
                                <input
                                    type="email"
                                    value={clientEmail}
                                    onChange={(e) =>
                                        setClientEmail(e.target.value)
                                    }
                                    className="input w-full"
                                    placeholder="tu@email.com"
                                />
                                {errors.email && (
                                    <p className="text-xs text-danger mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="label">
                                    Teléfono (opcional)
                                </label>
                                <input
                                    type="tel"
                                    value={clientPhone}
                                    onChange={(e) =>
                                        setClientPhone(e.target.value)
                                    }
                                    className="input w-full"
                                    placeholder="+54 9 11 1234 5678"
                                />
                                {errors.phone && (
                                    <p className="text-xs text-danger mt-1">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Panel - Slots & Confirmation */}
                <div className="md:col-span-2">
                    <div className="card p-6">
                        {!business ? (
                            <div className="py-16 text-center space-y-4">
                                <div className="w-16 h-16 mx-auto rounded-full bg-input flex items-center justify-center">
                                    <svg
                                        width="28"
                                        height="28"
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
                                </div>
                                <div>
                                    <p className="font-medium text-muted">
                                        Selecciona un negocio para comenzar
                                    </p>
                                    <p className="text-sm text-muted mt-1">
                                        Elige un negocio del menú lateral
                                    </p>
                                </div>
                            </div>
                        ) : !selectedSlot ? (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">
                                    Horarios disponibles
                                </h3>
                                {slots.length === 0 ? (
                                    <div className="py-12 text-center space-y-4">
                                        <div className="w-16 h-16 mx-auto rounded-full bg-input flex items-center justify-center">
                                            <svg
                                                width="28"
                                                height="28"
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
                                        </div>
                                        <div>
                                            <p className="font-medium text-muted">
                                                No hay horarios disponibles
                                            </p>
                                            <p className="text-sm text-muted mt-1">
                                                Prueba con otra fecha o duración
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                        {slots.map((slot) => (
                                            <button
                                                key={slot.time}
                                                onClick={() =>
                                                    setSelectedSlot(slot.time)
                                                }
                                                className="btn btn-secondary py-3 hover:bg-brand hover:text-white hover:border-brand flex flex-col items-center gap-1"
                                            >
                                                <span className="font-medium">
                                                    {slot.time}
                                                </span>
                                                {slot.price !== undefined && (
                                                    <span className="text-xs opacity-80">
                                                        {business.currency ||
                                                            "$"}
                                                        {slot.price}
                                                    </span>
                                                )}
                                                {slot.price === undefined && (
                                                    <span className="text-xs opacity-80">
                                                        Gratis
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between pb-4 border-b">
                                    <h3 className="font-semibold text-lg">
                                        Confirmar reserva
                                    </h3>
                                    <button
                                        onClick={() => setSelectedSlot(null)}
                                        className="btn btn-ghost text-xs"
                                    >
                                        Cambiar horario
                                    </button>
                                </div>

                                {/* Booking Summary */}
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg bg-input">
                                        <div className="space-y-3">
                                            <div className="flex items-start justify-between">
                                                <span className="text-sm text-muted">
                                                    Negocio
                                                </span>
                                                <span className="font-medium">
                                                    {business.name}
                                                </span>
                                            </div>
                                            <div className="flex items-start justify-between">
                                                <span className="text-sm text-muted">
                                                    Fecha
                                                </span>
                                                <span className="font-medium">
                                                    {date}
                                                </span>
                                            </div>
                                            <div className="flex items-start justify-between">
                                                <span className="text-sm text-muted">
                                                    Horario
                                                </span>
                                                <span className="font-medium">
                                                    {selectedSlot}
                                                </span>
                                            </div>
                                            <div className="flex items-start justify-between">
                                                <span className="text-sm text-muted">
                                                    Duración
                                                </span>
                                                <span className="font-medium">
                                                    {duration} minutos
                                                </span>
                                            </div>
                                            <div className="flex items-start justify-between pt-2 border-t">
                                                <span className="text-sm text-muted">
                                                    Precio
                                                </span>
                                                <span className="font-semibold text-brand">
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

                                    <button
                                        onClick={reserve}
                                        disabled={!clientName.trim()}
                                        className="btn btn-primary w-full py-3 text-base"
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
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {toast && <Toast message={toast} onClose={() => setToast(null)} />}
        </div>
    );
}
