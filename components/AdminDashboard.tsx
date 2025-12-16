"use client";
import { useEffect, useState } from "react";
import BusinessForm from "./BusinessForm";
import { Business, Booking } from "../lib/models";
import * as storage from "../lib/storage";
import Toast from "./Toast";

export default function AdminDashboard() {
    const [data, setData] = useState<{
        businesses: Business[];
        bookings: Booking[];
    }>({ businesses: [], bookings: [] });
    const [editing, setEditing] = useState<Business | undefined>(undefined);
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        setData(storage.getAll());
        const onStorage = () => setData(storage.getAll());
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    function handleSave(b: Business) {
        const exists = data.businesses.find((x) => x.id === b.id);
        if (exists) storage.updateBusiness(b);
        else storage.addBusiness(b);
        setData(storage.getAll());
        setEditing(undefined);
        setToast("✓ Negocio guardado exitosamente");
    }

    function remove(id: string) {
        if (!confirm("¿Eliminar este negocio y todos sus turnos asociados?"))
            return;
        storage.deleteBusiness(id);
        setData(storage.getAll());
        setToast("Negocio eliminado");
    }

    function cancelBooking(id: string) {
        if (!confirm("¿Confirmas cancelar este turno?")) return;
        storage.cancelBooking(id);
        setData(storage.getAll());
        setToast("Turno cancelado");
    }

    return (
        <div className="container py-8 space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Panel de Administración
                    </h2>
                    <p className="text-muted">
                        Gestiona tus negocios, horarios y reservas de turnos
                    </p>
                </div>
                <button
                    onClick={() =>
                        setEditing({
                            id: "",
                            name: "",
                            minDuration: 30,
                            maxDuration: 60,
                            schedule: {
                                0: [],
                                1: [],
                                2: [],
                                3: [],
                                4: [],
                                5: [],
                                6: []
                            }
                        })
                    }
                    className="btn btn-primary w-full sm:w-auto"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    Nuevo negocio
                </button>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Businesses List */}
                <div className="lg:col-span-1">
                    <div className="card p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">
                                Mis Negocios
                            </h3>
                            <span className="badge">
                                {data.businesses.length}
                            </span>
                        </div>

                        {data.businesses.length === 0 ? (
                            <div className="py-8 text-center space-y-3">
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
                                    <p className="text-sm font-medium text-muted">
                                        No hay negocios todavía
                                    </p>
                                    <p className="text-xs text-muted mt-1">
                                        Crea tu primer negocio para comenzar
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {data.businesses.map((b) => (
                                    <div
                                        key={b.id}
                                        className="p-4 rounded-lg border hover:border-brand transition-all group"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium truncate">
                                                    {b.name}
                                                </h4>
                                                <p className="text-sm text-muted mt-1">
                                                    {b.minDuration}–
                                                    {b.maxDuration} minutos
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-3">
                                            <button
                                                onClick={() => setEditing(b)}
                                                className="btn btn-ghost text-xs flex-1"
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
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => remove(b.id)}
                                                className="btn btn-ghost text-danger text-xs"
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
                                                    <polyline points="3 6 5 6 21 6" />
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Form or Bookings */}
                <div className="lg:col-span-2">
                    <div className="card p-6">
                        {editing ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between pb-4 border-b">
                                    <h3 className="font-semibold text-lg">
                                        {editing.id
                                            ? "Editar negocio"
                                            : "Nuevo negocio"}
                                    </h3>
                                    <button
                                        onClick={() => setEditing(undefined)}
                                        className="btn btn-ghost text-xs"
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
                                            <line
                                                x1="18"
                                                y1="6"
                                                x2="6"
                                                y2="18"
                                            />
                                            <line
                                                x1="6"
                                                y1="6"
                                                x2="18"
                                                y2="18"
                                            />
                                        </svg>
                                        Cancelar
                                    </button>
                                </div>
                                <BusinessForm
                                    initial={editing}
                                    onSave={handleSave}
                                />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-lg">
                                        Turnos Agendados
                                    </h3>
                                    <span className="badge">
                                        {data.bookings.length}
                                    </span>
                                </div>

                                {data.bookings.length === 0 ? (
                                    <div className="py-16 text-center space-y-3">
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
                                        <div>
                                            <p className="text-sm font-medium text-muted">
                                                No hay turnos reservados
                                            </p>
                                            <p className="text-xs text-muted mt-1">
                                                Las reservas aparecerán aquí
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {data.bookings.map((bk) => {
                                            const business =
                                                data.businesses.find(
                                                    (x) =>
                                                        x.id === bk.businessId
                                                );
                                            return (
                                                <div
                                                    key={bk.id}
                                                    className="p-4 rounded-lg border hover:border-brand transition-all"
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1 space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-medium">
                                                                    {
                                                                        bk.clientName
                                                                    }
                                                                </h4>
                                                                <span className="badge badge-success text-xs">
                                                                    {
                                                                        bk.duration
                                                                    }{" "}
                                                                    min
                                                                </span>
                                                            </div>
                                                            <div className="text-sm text-muted space-y-1">
                                                                <div className="flex items-center gap-2">
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
                                                                    <span>
                                                                        {
                                                                            bk.date
                                                                        }{" "}
                                                                        •{" "}
                                                                        {
                                                                            bk.start
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
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
                                                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                                                        <polyline points="9 22 9 12 15 12 15 22" />
                                                                    </svg>
                                                                    <span>
                                                                        {business?.name ||
                                                                            "—"}
                                                                    </span>
                                                                </div>
                                                                {bk.price !==
                                                                    undefined && (
                                                                    <div className="flex items-center gap-2">
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
                                                                            <line
                                                                                x1="12"
                                                                                y1="1"
                                                                                x2="12"
                                                                                y2="23"
                                                                            />
                                                                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                                                        </svg>
                                                                        <span className="font-medium text-brand">
                                                                            {business?.currency ||
                                                                                "$"}
                                                                            {
                                                                                bk.price
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() =>
                                                                cancelBooking(
                                                                    bk.id
                                                                )
                                                            }
                                                            className="btn btn-danger text-xs"
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
                                                                <line
                                                                    x1="18"
                                                                    y1="6"
                                                                    x2="6"
                                                                    y2="18"
                                                                />
                                                                <line
                                                                    x1="6"
                                                                    y1="6"
                                                                    x2="18"
                                                                    y2="18"
                                                                />
                                                            </svg>
                                                            Cancelar
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {toast && <Toast message={toast} onClose={() => setToast(null)} />}
        </div>
    );
}
