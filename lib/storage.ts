import { AppData, Business, Booking } from "./models";

const KEY = "gd_turnos_v1";

const defaultData: AppData = { businesses: [], bookings: [] };

function read(): AppData {
    if (typeof window === "undefined") return defaultData;
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return defaultData;
        return JSON.parse(raw) as AppData;
    } catch (e) {
        console.error("read storage", e);
        return defaultData;
    }
}

function write(data: AppData) {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(data));
}

export function getAll(): AppData {
    return read();
}

export function saveAll(data: AppData) {
    write(data);
}

export function addBusiness(b: Business) {
    const d = read();
    d.businesses.push(b);
    write(d);
}

export function updateBusiness(b: Business) {
    const d = read();
    d.businesses = d.businesses.map((x) => (x.id === b.id ? b : x));
    write(d);
}

export function deleteBusiness(id: string) {
    const d = read();
    d.businesses = d.businesses.filter((x) => x.id !== id);
    d.bookings = d.bookings.filter((b) => b.businessId !== id);
    write(d);
}

export function addBooking(book: Booking) {
    const d = read();
    d.bookings.push(book);
    write(d);
}

export function cancelBooking(id: string) {
    const d = read();
    d.bookings = d.bookings.filter((b) => b.id !== id);
    write(d);
}
