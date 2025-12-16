"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Business, Weekday, TimeRange } from "../lib/models";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

const weekdays = [
    { short: "Dom", full: "Domingo" },
    { short: "Lun", full: "Lunes" },
    { short: "Mar", full: "Martes" },
    { short: "Mié", full: "Miércoles" },
    { short: "Jue", full: "Jueves" },
    { short: "Vie", full: "Viernes" },
    { short: "Sáb", full: "Sábado" }
];

export default function BusinessForm({
    onSave,
    initial
}: {
    onSave: (b: Business) => void;
    initial?: Partial<Business>;
}) {
    const [name, setName] = useState(initial?.name || "");
    const [minD, setMinD] = useState(initial?.minDuration || 30);
    const [maxD, setMaxD] = useState(initial?.maxDuration || 60);
    const [currency, setCurrency] = useState(initial?.currency || "$");
    const [email, setEmail] = useState(initial?.email || "");
    const [whatsapp, setWhatsapp] = useState(initial?.whatsapp || "");

    const initSchedule = (): Record<Weekday, TimeRange[]> => {
        const s: any = {};
        for (let i = 0; i < 7; i++)
            s[i] = initial?.schedule?.[i as Weekday] ?? [];
        return s;
    };

    const [schedule, setSchedule] =
        useState<Record<Weekday, TimeRange[]>>(initSchedule);

    function addRange(day: number) {
        setSchedule((s) => ({
            ...s,
            [day]: [
                ...(s[day as Weekday] || []),
                { start: "09:00", end: "17:00" }
            ]
        }));
    }

    function updateRange(
        day: number,
        idx: number,
        key: "start" | "end" | "price",
        value: string | number
    ) {
        setSchedule((s) => {
            const copy = { ...s };
            copy[day as Weekday] = copy[day as Weekday].map(
                (r: TimeRange, i: number) => {
                    if (i === idx) {
                        if (key === "price") {
                            const price =
                                value === "" ? undefined : Number(value);
                            return { ...r, price };
                        }
                        return { ...r, [key]: value };
                    }
                    return r;
                }
            );
            return copy;
        });
    }

    function removeRange(day: number, idx: number) {
        setSchedule((s) => {
            const copy = { ...s };
            copy[day as Weekday] = copy[day as Weekday].filter(
                (_: TimeRange, i: number) => i !== idx
            );
            return copy;
        });
    }

    function save() {
        const totalRanges = Object.values(schedule).reduce(
            (acc, arr) => acc + arr.length,
            0
        );
        if (!name.trim()) {
            toast.error("El nombre del negocio es requerido");
            return;
        }
        if (Number(minD) <= 0 || Number(maxD) <= 0) {
            toast.error("Las duraciones deben ser mayores que 0");
            return;
        }
        if (Number(minD) > Number(maxD)) {
            toast.error("La duración mínima no puede ser mayor que la máxima");
            return;
        }

        const b: Business = {
            id: (initial && (initial as any).id) || uid(),
            name: name.trim(),
            minDuration: Number(minD),
            maxDuration: Number(maxD),
            schedule,
            currency: currency.trim() || "$",
            email: email.trim() || undefined,
            whatsapp: whatsapp.trim() || undefined
        };

        if (totalRanges === 0) {
            if (
                !confirm(
                    "No configuraste horarios de atención. ¿Guardar de todos modos?"
                )
            ) {
                return;
            }
        }

        onSave(b);
        toast.success("✓ Negocio guardado exitosamente");
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            {/* Basic Info */}
            <Card className="p-6">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">
                            Nombre del negocio{" "}
                            <span className="text-danger">*</span>
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ej: Barbería Centro"
                            className="mt-1.5"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="email">
                                Email del negocio{" "}
                                <span className="text-muted text-xs font-normal">
                                    (opcional)
                                </span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="negocio@example.com"
                                className="mt-1.5"
                            />
                            <p className="text-xs text-muted mt-1.5">
                                Para notificaciones por email
                            </p>
                        </div>
                        <div>
                            <Label htmlFor="whatsapp">
                                WhatsApp{" "}
                                <span className="text-muted text-xs font-normal">
                                    (opcional)
                                </span>
                            </Label>
                            <Input
                                id="whatsapp"
                                type="tel"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                placeholder="+54 9 11 1234 5678"
                                className="mt-1.5"
                            />
                            <p className="text-xs text-muted mt-1.5">
                                Incluye código de país (ej: +549...)
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="minD">
                                Duración mínima (min){" "}
                                <span className="text-danger">*</span>
                            </Label>
                            <Input
                                id="minD"
                                type="number"
                                value={minD}
                                onChange={(e) =>
                                    setMinD(Number(e.target.value))
                                }
                                min={5}
                                step={5}
                                className="mt-1.5"
                            />
                        </div>
                        <div>
                            <Label htmlFor="maxD">
                                Duración máxima (min){" "}
                                <span className="text-danger">*</span>
                            </Label>
                            <Input
                                id="maxD"
                                type="number"
                                value={maxD}
                                onChange={(e) =>
                                    setMaxD(Number(e.target.value))
                                }
                                min={5}
                                step={5}
                                className="mt-1.5"
                            />
                        </div>
                        <div>
                            <Label htmlFor="currency">Moneda</Label>
                            <Input
                                id="currency"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                placeholder="$"
                                className="mt-1.5"
                            />
                        </div>
                    </div>
                </div>
            </Card>

            {/* Schedule */}
            <Card className="p-6">
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-lg">
                            Horarios por día
                        </h3>
                        <p className="text-sm text-muted mt-1">
                            Configura los rangos horarios de atención
                        </p>
                    </div>

                    <div className="space-y-3">
                        {weekdays.map((w, idx) => {
                            const dayRanges = (schedule as any)[idx] || [];
                            const hasRanges = dayRanges.length > 0;

                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className={`p-4 rounded-lg border transition-all ${
                                        hasRanges
                                            ? "border-brand/30 bg-brand/5"
                                            : "border-border bg-card"
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <span className="font-medium">
                                                {w.full}
                                            </span>
                                            {hasRanges && (
                                                <Badge variant="success">
                                                    {dayRanges.length} rango
                                                    {dayRanges.length > 1
                                                        ? "s"
                                                        : ""}
                                                </Badge>
                                            )}
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => addRange(idx)}
                                        >
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M12 5v14M5 12h14" />
                                            </svg>
                                            Agregar
                                        </Button>
                                    </div>

                                    {dayRanges.length > 0 && (
                                        <AnimatePresence>
                                            <div className="space-y-2">
                                                {dayRanges.map(
                                                    (
                                                        r: TimeRange,
                                                        i: number
                                                    ) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{
                                                                opacity: 0,
                                                                height: 0
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                height: "auto"
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                                height: 0
                                                            }}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <div className="flex items-center gap-2 flex-1">
                                                                <Input
                                                                    type="time"
                                                                    value={
                                                                        r.start
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateRange(
                                                                            idx,
                                                                            i,
                                                                            "start",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="w-28"
                                                                />
                                                                <span className="text-muted text-xs">
                                                                    -
                                                                </span>
                                                                <Input
                                                                    type="time"
                                                                    value={
                                                                        r.end
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateRange(
                                                                            idx,
                                                                            i,
                                                                            "end",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="w-28"
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-xs text-muted">
                                                                    {currency}
                                                                </span>
                                                                <Input
                                                                    type="number"
                                                                    value={
                                                                        r.price ??
                                                                        ""
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateRange(
                                                                            idx,
                                                                            i,
                                                                            "price",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="w-20"
                                                                    placeholder="Gratis"
                                                                    min={0}
                                                                    step="0.01"
                                                                />
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() =>
                                                                    removeRange(
                                                                        idx,
                                                                        i
                                                                    )
                                                                }
                                                                className="text-danger hover:bg-danger/10"
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
                                                                >
                                                                    <polyline points="3 6 5 6 21 6" />
                                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                                </svg>
                                                            </Button>
                                                        </motion.div>
                                                    )
                                                )}
                                            </div>
                                        </AnimatePresence>
                                    )}

                                    {!hasRanges && (
                                        <p className="text-sm text-muted text-center py-2">
                                            Sin horarios configurados
                                        </p>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </Card>

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-3"
            >
                <Button
                    variant="success"
                    onClick={save}
                    size="lg"
                    className="gap-2"
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
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Guardar negocio
                </Button>
            </motion.div>
        </motion.div>
    );
}
