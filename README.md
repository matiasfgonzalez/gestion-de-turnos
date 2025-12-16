# 📅 Gestión de Turnos

Sistema profesional de reserva de turnos para negocios. Aplicación web moderna construida con Next.js, diseñada para funcionar 100% en el navegador sin necesidad de backend.

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4+-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Características

### 🏢 Panel de Administración

-   Crear y gestionar múltiples negocios
-   Configurar horarios personalizados por día de la semana
-   Establecer duración mínima/máxima de turnos
-   Definir precios por rango horario (opcional)
-   Ver estadísticas: negocios, turnos totales, próximos turnos, ingresos
-   Filtrar turnos por negocio
-   Cancelar turnos con confirmación

### 👤 Panel de Cliente

-   Listar negocios disponibles
-   Seleccionar fecha y ver horarios disponibles en tiempo real
-   Elegir duración dentro del rango permitido
-   Reservar con datos de contacto (nombre, email, teléfono)
-   Notificar al negocio vía WhatsApp o Email

### 🎨 Interfaz Moderna

-   Diseño SaaS profesional y minimalista
-   Modo claro / oscuro con toggle (sin flash al cambiar de página)
-   Animaciones fluidas con Framer Motion
-   Toasts elegantes con Sonner
-   Componentes reutilizables estilo shadcn/ui
-   Totalmente responsive (mobile-first)

### 🔒 Privacidad y Seguridad

-   100% local: datos guardados en `localStorage`
-   Sin servidores externos
-   Sin registro requerido
-   Control total de la información

---

## 🛠️ Tech Stack

| Tecnología                   | Uso                            |
| ---------------------------- | ------------------------------ |
| **Next.js 15**               | Framework React con App Router |
| **TypeScript**               | Tipado estático                |
| **Tailwind CSS 4**           | Estilos utility-first          |
| **Framer Motion**            | Animaciones fluidas            |
| **Sonner**                   | Notificaciones toast           |
| **Radix UI**                 | Primitivos accesibles          |
| **class-variance-authority** | Variantes de componentes       |
| **localStorage**             | Persistencia de datos          |

---

## 📁 Estructura del Proyecto

```
gestion-de-turnos/
├── app/
│   ├── globals.css          # Variables CSS y estilos globales
│   ├── layout.tsx           # Layout principal con header/footer
│   ├── page.tsx             # Landing page
│   ├── admin/
│   │   └── page.tsx         # Página de administración
│   └── client/
│       └── page.tsx         # Página de reservas
├── components/
│   ├── AdminDashboard.tsx   # Dashboard de administración
│   ├── BusinessForm.tsx     # Formulario de negocio
│   ├── ClientBooking.tsx    # Flujo de reserva
│   ├── ThemeToggle.tsx      # Toggle modo claro/oscuro
│   ├── Toast.tsx            # Componente toast (legacy)
│   └── ui/                  # Componentes UI reutilizables
│       ├── button.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── empty-state.tsx
│       └── sonner.tsx
├── lib/
│   ├── models.ts            # Tipos TypeScript
│   ├── storage.ts           # CRUD localStorage
│   └── utils.ts             # Utilidades (cn)
└── public/                  # Assets estáticos
```

---

## 🚀 Instalación

### Requisitos

-   Node.js 20.9+ (requerido por Next.js 15)
-   npm, yarn, pnpm o bun

### Pasos

1. **Clonar el repositorio:**

```bash
git clone <repo-url>
cd gestion-de-turnos
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Ejecutar en desarrollo:**

```bash
npm run dev
```

4. **Abrir en el navegador:**

```
http://localhost:3000
```

---

## 📖 Uso

### Modo Administrador (`/admin`)

1. Click en **"+ Nuevo negocio"**
2. Completar datos:
    - Nombre del negocio
    - Email y WhatsApp (para notificaciones)
    - Duración mínima/máxima de turnos
    - Moneda (opcional)
3. Configurar horarios por día de la semana:
    - Agregar rangos horarios (ej: 09:00 - 13:00, 14:00 - 18:00)
    - Definir precio por rango (opcional)
4. Guardar el negocio
5. Ver y gestionar turnos reservados

### Modo Cliente (`/client`)

1. Seleccionar un negocio de la lista
2. Elegir fecha en el calendario
3. Seleccionar duración del turno
4. Elegir horario disponible
5. Completar datos de contacto
6. Confirmar reserva
7. Notificar al negocio por WhatsApp o Email

---

## 🎨 Personalización

### Variables CSS

Las variables de color se definen en `app/globals.css`:

```css
:root {
    --background: #fafbfc;
    --foreground: #0f172a;
    --brand: #0ea5e9;
    --accent: #8b5cf6;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    /* ... más variables */
}

.dark {
    --background: #0a0f1e;
    --foreground: #f1f5f9;
    --brand: #06b6d4;
    /* ... modo oscuro */
}
```

### Componentes UI

Los componentes en `components/ui/` siguen el patrón shadcn/ui con variantes:

```tsx
<Button variant="default" size="lg">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>
<Button variant="whatsapp">WhatsApp</Button>
```

---

## 🔧 Scripts Disponibles

| Comando         | Descripción            |
| --------------- | ---------------------- |
| `npm run dev`   | Servidor de desarrollo |
| `npm run build` | Build de producción    |
| `npm run start` | Servidor de producción |
| `npm run lint`  | Linter ESLint          |

---

## 🐳 Docker

El proyecto incluye configuración Docker:

```bash
# Desarrollo
docker-compose up

# Producción
docker build -t gestion-turnos .
docker run -p 3000:3000 gestion-turnos
```

---

## 📝 Modelo de Datos

### Business (Negocio)

```typescript
type Business = {
    id: string;
    name: string;
    minDuration: number; // minutos
    maxDuration: number; // minutos
    schedule: Record<Weekday, TimeRange[]>;
    currency?: string; // "$", "USD", etc.
    email?: string; // para notificaciones
    whatsapp?: string; // con código de país
};
```

### Booking (Reserva)

```typescript
type Booking = {
    id: string;
    businessId: string;
    date: string; // YYYY-MM-DD
    start: string; // HH:MM
    end: string; // HH:MM
    duration: number;
    clientName: string;
    clientEmail?: string;
    clientPhone?: string;
    price?: number;
};
```

---

## 🤝 Contribuir

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

---

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

-   [Next.js](https://nextjs.org/) - Framework React
-   [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
-   [Framer Motion](https://www.framer.com/motion/) - Animaciones
-   [Radix UI](https://www.radix-ui.com/) - Primitivos accesibles
-   [Sonner](https://sonner.emilkowal.ski/) - Toasts elegantes
-   [shadcn/ui](https://ui.shadcn.com/) - Inspiración de componentes

---

<p align="center">
  Hecho con ❤️ usando Next.js
</p>
