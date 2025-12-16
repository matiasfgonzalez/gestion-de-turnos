"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BusinessForm from "./BusinessForm";
import { Business, Booking } from "../lib/models";
import * as storage from "../lib/storage";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { EmptyState } from "./ui/empty-state";
import { toast } from "sonner";

export default function AdminDashboard() {
    const [data, setData] = useState<{
        businesses: Business[];
        bookings: Booking[];
    }>({ businesses: [], bookings: [] });
    const [editing, setEditing] = useState<Business | undefined>(undefined);
    const [selectedBusinessFilter, setSelectedBusinessFilter] = useState<
        string | null
    >(null);

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
        toast.success(
            exists ? "✓ Negocio actualizado" : "✓ Negocio creado exitosamente"
        );
    }

    function remove(id: string) {
        if (!confirm("¿Eliminar este negocio y todos sus turnos asociados?"))
            return;
        storage.deleteBusiness(id);
        setData(storage.getAll());
        toast.success("Negocio eliminado correctamente");
    }

    function cancelBooking(id: string) {
        if (!confirm("¿Confirmas cancelar este turno?")) return;
        storage.cancelBooking(id);
        setData(storage.getAll());
        toast.success("Turno cancelado correctamente");
    }

    // Filter bookings by selected business
    const filteredBookings = selectedBusinessFilter
        ? data.bookings.filter((b) => b.businessId === selectedBusinessFilter)
        : data.bookings;

    // Sort bookings by date (newest first)
    const sortedBookings = [...filteredBookings].sort((a, b) => {
        const dateCompare = b.date.localeCompare(a.date);
        if (dateCompare !== 0) return dateCompare;
        return b.start.localeCompare(a.start);
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container py-8 space-y-8"
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Panel de Administración
                    </h2>
                    <p className="text-muted">
                        Gestiona tus negocios, horarios y reservas de turnos
                    </p>
                </div>
                <Button
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
                    size="lg"
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
                </Button>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-brand"
                            >
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">
                                {data.businesses.length}
                            </p>
                            <p className="text-xs text-muted">Negocios</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-success"
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
                        </div>
                        <div>
                            <p className="text-2xl font-bold">
                                {data.bookings.length}
                            </p>
                            <p className="text-xs text-muted">Turnos totales</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-accent"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">
                                {
                                    data.bookings.filter(
                                        (b) =>
                                            b.date >=
                                            new Date()
                                                .toISOString()
                                                .slice(0, 10)
                                    ).length
                                }
                            </p>
                            <p className="text-xs text-muted">Próximos</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-warning"
                            >
                                <line x1="12" y1="1" x2="12" y2="23" />
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">
                                $
                                {data.bookings.reduce(
                                    (acc, b) => acc + (b.price || 0),
                                    0
                                )}
                            </p>
                            <p className="text-xs text-muted">
                                Total facturado
                            </p>
                        </div>
                    </div>
                </Card>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Businesses List */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-1"
                >
                    <Card className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">
                                Mis Negocios
                            </h3>
                            <Badge variant="secondary">
                                {data.businesses.length}
                            </Badge>
                        </div>

                        {data.businesses.length === 0 ? (
                            <EmptyState
                                icon={
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        className="text-muted"
                                    >
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                        <polyline points="9 22 9 12 15 12 15 22" />
                                    </svg>
                                }
                                title="No hay negocios todavía"
                                description="Crea tu primer negocio para comenzar a recibir reservas"
                                action={
                                    <Button
                                        size="sm"
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
                                    >
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                        Crear negocio
                                    </Button>
                                }
                                className="py-8"
                            />
                        ) : (
                            <AnimatePresence mode="popLayout">
                                <div className="space-y-3">
                                    {data.businesses.map((b, index) => (
                                        <motion.div
                                            key={b.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={`p-4 rounded-xl border-2 transition-all cursor-pointer group ${
                                                selectedBusinessFilter === b.id
                                                    ? "border-brand bg-brand/5"
                                                    : "border-transparent hover:border-brand/30 hover:bg-card-hover"
                                            }`}
                                            onClick={() =>
                                                setSelectedBusinessFilter(
                                                    selectedBusinessFilter ===
                                                        b.id
                                                        ? null
                                                        : b.id
                                                )
                                            }
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-semibold truncate">
                                                            {b.name}
                                                        </h4>
                                                        {b.whatsapp && (
                                                            <span className="text-success text-xs">
                                                                📱
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted mt-1">
                                                        {b.minDuration}–
                                                        {b.maxDuration} min •{" "}
                                                        {b.currency || "$"}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Badge
                                                            variant="success"
                                                            className="text-[10px]"
                                                        >
                                                            {
                                                                data.bookings.filter(
                                                                    (bk) =>
                                                                        bk.businessId ===
                                                                        b.id
                                                                ).length
                                                            }{" "}
                                                            turnos
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 mt-3 pt-3 border-t opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setEditing(b);
                                                    }}
                                                    className="flex-1"
                                                >
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                    Editar
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        remove(b.id);
                                                    }}
                                                    className="text-danger hover:bg-danger/10"
                                                >
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <polyline points="3 6 5 6 21 6" />
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                    </svg>
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </AnimatePresence>
                        )}
                    </Card>
                </motion.div>

                {/* Form or Bookings */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-2"
                >
                    <Card className="p-6">
                        <AnimatePresence mode="wait">
                            {editing ? (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center justify-between pb-4 border-b">
                                        <div>
                                            <h3 className="font-semibold text-xl">
                                                {editing.id
                                                    ? "Editar negocio"
                                                    : "Nuevo negocio"}
                                            </h3>
                                            <p className="text-sm text-muted mt-1">
                                                {editing.id
                                                    ? "Modifica los datos del negocio"
                                                    : "Configura los datos de tu nuevo negocio"}
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                setEditing(undefined)
                                            }
                                        >
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
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
                                        </Button>
                                    </div>
                                    <BusinessForm
                                        initial={editing}
                                        onSave={handleSave}
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="bookings"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="font-semibold text-xl">
                                                Turnos Agendados
                                            </h3>
                                            <p className="text-sm text-muted mt-1">
                                                {selectedBusinessFilter
                                                    ? `Mostrando turnos de ${
                                                          data.businesses.find(
                                                              (b) =>
                                                                  b.id ===
                                                                  selectedBusinessFilter
                                                          )?.name
                                                      }`
                                                    : "Todas las reservas de tus negocios"}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {selectedBusinessFilter && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        setSelectedBusinessFilter(
                                                            null
                                                        )
                                                    }
                                                >
                                                    Ver todos
                                                </Button>
                                            )}
                                            <Badge variant="secondary">
                                                {sortedBookings.length} turnos
                                            </Badge>
                                        </div>
                                    </div>

                                    {sortedBookings.length === 0 ? (
                                        <EmptyState
                                            icon={
                                                <svg
                                                    width="48"
                                                    height="48"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
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
                                            }
                                            title={
                                                selectedBusinessFilter
                                                    ? "No hay turnos para este negocio"
                                                    : "No hay turnos reservados"
                                            }
                                            description={
                                                selectedBusinessFilter
                                                    ? "Los turnos de este negocio aparecerán aquí cuando los clientes reserven"
                                                    : "Las reservas de clientes aparecerán aquí"
                                            }
                                        />
                                    ) : (
                                        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                                            {sortedBookings.map((bk, index) => {
                                                const business =
                                                    data.businesses.find(
                                                        (x) =>
                                                            x.id ===
                                                            bk.businessId
                                                    );
                                                const isToday =
                                                    bk.date ===
                                                    new Date()
                                                        .toISOString()
                                                        .slice(0, 10);
                                                const isPast =
                                                    bk.date <
                                                    new Date()
                                                        .toISOString()
                                                        .slice(0, 10);

                                                return (
                                                    <motion.div
                                                        key={bk.id}
                                                        initial={{
                                                            opacity: 0,
                                                            y: 10
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0
                                                        }}
                                                        transition={{
                                                            delay: index * 0.03
                                                        }}
                                                        className={`p-4 rounded-xl border-2 transition-all ${
                                                            isPast
                                                                ? "border-border/50 opacity-60"
                                                                : isToday
                                                                ? "border-success/30 bg-success/5"
                                                                : "border-transparent hover:border-brand/30"
                                                        }`}
                                                    >
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div className="flex-1 space-y-2">
                                                                <div className="flex items-center gap-2 flex-wrap">
                                                                    <h4 className="font-semibold">
                                                                        {
                                                                            bk.clientName
                                                                        }
                                                                    </h4>
                                                                    <Badge
                                                                        variant={
                                                                            isToday
                                                                                ? "success"
                                                                                : isPast
                                                                                ? "secondary"
                                                                                : "default"
                                                                        }
                                                                    >
                                                                        {
                                                                            bk.duration
                                                                        }{" "}
                                                                        min
                                                                    </Badge>
                                                                    {isToday && (
                                                                        <Badge variant="success">
                                                                            Hoy
                                                                        </Badge>
                                                                    )}
                                                                    {isPast && (
                                                                        <Badge variant="secondary">
                                                                            Pasado
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted">
                                                                    <div className="flex items-center gap-2">
                                                                        <svg
                                                                            width="14"
                                                                            height="14"
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
                                                                            {new Date(
                                                                                bk.date +
                                                                                    "T00:00"
                                                                            ).toLocaleDateString(
                                                                                "es",
                                                                                {
                                                                                    weekday:
                                                                                        "short",
                                                                                    day: "numeric",
                                                                                    month: "short"
                                                                                }
                                                                            )}{" "}
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
                                                                        >
                                                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                                                            <polyline points="9 22 9 12 15 12 15 22" />
                                                                        </svg>
                                                                        <span>
                                                                            {business?.name ||
                                                                                "—"}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                {(bk.clientEmail ||
                                                                    bk.clientPhone ||
                                                                    bk.price !==
                                                                        undefined) && (
                                                                    <div className="flex flex-wrap items-center gap-3 pt-2 border-t text-sm">
                                                                        {bk.price !==
                                                                            undefined && (
                                                                            <span className="font-semibold text-brand">
                                                                                {business?.currency ||
                                                                                    "$"}
                                                                                {
                                                                                    bk.price
                                                                                }
                                                                            </span>
                                                                        )}
                                                                        {bk.clientEmail && (
                                                                            <span className="text-muted">
                                                                                📧{" "}
                                                                                {
                                                                                    bk.clientEmail
                                                                                }
                                                                            </span>
                                                                        )}
                                                                        {bk.clientPhone && (
                                                                            <span className="text-muted">
                                                                                📱{" "}
                                                                                {
                                                                                    bk.clientPhone
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <Button
                                                                variant="danger"
                                                                size="sm"
                                                                onClick={() =>
                                                                    cancelBooking(
                                                                        bk.id
                                                                    )
                                                                }
                                                            >
                                                                <svg
                                                                    width="14"
                                                                    height="14"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
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
                                                                <span className="hidden sm:inline">
                                                                    Cancelar
                                                                </span>
                                                            </Button>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}
