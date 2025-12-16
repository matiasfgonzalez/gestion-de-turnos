export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type TimeRange = {
    start: string;
    end: string;
    price?: number; // Precio opcional para este rango horario
};

export type Business = {
    id: string;
    name: string;
    minDuration: number; // minutes
    maxDuration: number; // minutes
    schedule: Record<Weekday, TimeRange[]>;
    currency?: string; // Ej: "$", "USD", "ARS", etc
    email?: string; // Email del negocio para notificaciones
    whatsapp?: string; // Número de WhatsApp (con código de país)
};

export type Booking = {
    id: string;
    businessId: string;
    date: string; // YYYY-MM-DD
    start: string; // HH:MM
    end: string; // HH:MM
    duration: number;
    clientName: string;
    clientEmail?: string;
    clientPhone?: string;
    price?: number; // Precio del turno (puede ser undefined si es gratis)
};

export type AppData = {
    businesses: Business[];
    bookings: Booking[];
};
