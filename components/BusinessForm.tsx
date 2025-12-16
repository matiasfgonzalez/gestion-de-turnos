"use client";
import React, { useState } from "react";
import { Business, Weekday, TimeRange } from "../lib/models";

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
            alert("El nombre del negocio es requerido");
            return;
        }
        if (Number(minD) <= 0 || Number(maxD) <= 0) {
            alert("Las duraciones deben ser mayores que 0");
            return;
        }
        if (Number(minD) > Number(maxD)) {
            alert("La duración mínima no puede ser mayor que la máxima");
            return;
        }

        const b: Business = {
            id: (initial && (initial as any).id) || uid(),
            name: name.trim(),
            minDuration: Number(minD),
            maxDuration: Number(maxD),
            schedule,
            currency: currency.trim() || "$"
        };

        if (totalRanges === 0) {
            const ok = confirm(
                "No configuraste horarios de atención. ¿Guardar de todos modos?"
            );
            if (!ok) return;
        }

        onSave(b);
    }

    return (
        <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
                <div>
                    <label className="label">
                        Nombre del negocio{" "}
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        className="input w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej: Barbería Centro"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="label">
                            Duración mínima (min){" "}
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="number"
                            className="input w-full"
                            value={minD}
                            onChange={(e) => setMinD(Number(e.target.value))}
                            min={5}
                            step={5}
                        />
                    </div>
                    <div>
                        <label className="label">
                            Duración máxima (min){" "}
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            type="number"
                            className="input w-full"
                            value={maxD}
                            onChange={(e) => setMaxD(Number(e.target.value))}
                            min={5}
                            step={5}
                        />
                    </div>
                </div>
            </div>

            <div className="divider" />

            {/* Schedule */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <label className="label mb-0">Horarios por día</label>
                        <p className="text-xs text-muted mt-0.5">
                            Configura los rangos horarios de atención
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {weekdays.map((w, idx) => {
                        const dayRanges = (schedule as any)[idx] || [];
                        const hasRanges = dayRanges.length > 0;

                        return (
                            <div
                                key={idx}
                                className={`p-4 rounded-lg border transition-all ${
                                    hasRanges
                                        ? "border-brand/30 bg-brand/5"
                                        : "border-border bg-input/30"
                                }`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium">
                                            {w.full}
                                        </span>
                                        {hasRanges && (
                                            <span className="badge badge-success text-xs">
                                                {dayRanges.length} rango
                                                {dayRanges.length > 1
                                                    ? "s"
                                                    : ""}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => addRange(idx)}
                                        className="btn btn-ghost text-xs"
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
                                        Agregar rango
                                    </button>
                                </div>

                                {dayRanges.length > 0 && (
                                    <div className="space-y-2">
                                        {dayRanges.map(
                                            (r: TimeRange, i: number) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-2"
                                                >
                                                    <div className="flex items-center gap-2 flex-1">
                                                        <input
                                                            type="time"
                                                            value={r.start}
                                                            onChange={(e) =>
                                                                updateRange(
                                                                    idx,
                                                                    i,
                                                                    "start",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="input w-24"
                                                        />
                                                        <span className="text-muted text-xs">
                                                            -
                                                        </span>
                                                        <input
                                                            type="time"
                                                            value={r.end}
                                                            onChange={(e) =>
                                                                updateRange(
                                                                    idx,
                                                                    i,
                                                                    "end",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="input w-24"
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-xs text-muted">
                                                            {currency}
                                                        </span>
                                                        <input
                                                            type="number"
                                                            value={
                                                                r.price ?? ""
                                                            }
                                                            onChange={(e) =>
                                                                updateRange(
                                                                    idx,
                                                                    i,
                                                                    "price",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="input w-20"
                                                            placeholder="Gratis"
                                                            min={0}
                                                            step="0.01"
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            removeRange(idx, i)
                                                        }
                                                        className="btn btn-ghost text-danger p-2"
                                                        title="Eliminar rango"
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
                                                    </button>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}

                                {!hasRanges && (
                                    <p className="text-sm text-muted text-center py-2">
                                        Sin horarios configurados
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
                <button onClick={save} className="btn btn-primary">
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
                </button>
            </div>
        </div>
    );
}
