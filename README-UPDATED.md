\*\*Gestión de Turnos (Next.js App Router)

-   **Descripción:** Aplicación web para que negocios configuren horarios y clientes reserven turnos. Implementada con Next.js (App Router), Tailwind CSS y persistencia en el navegador mediante `localStorage`.

**Características principales**

-   **Panel de Administración:** crear y gestionar múltiples negocios, configurar horarios por día de la semana, establecer duración mínima/máxima de turnos, ver y cancelar turnos.
-   **Panel de Cliente:** listar negocios, seleccionar fecha y horario disponible, elegir duración dentro del rango permitido, reservar con datos de contacto.
-   **Persistencia:** todos los datos se guardan en `localStorage` (clave `gd_turnos_v1`).
-   **UI moderna:** Tailwind CSS, tema de colores personalizado y modo oscuro con toggle.

**Tech stack**

-   **Framework:** Next.js (App Router)
-   **Estilos:** Tailwind CSS
-   **Persistencia:** localStorage
-   **Lenguaje:** TypeScript + React

**Instalación y ejecución**

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar en modo desarrollo:

```bash
npm run dev
```

3. Abrir en el navegador:

```text
http://localhost:3000
```

**Rutas principales**

-   `/` — Landing con enlaces a los modos.
-   `/admin` — Panel de administración (crear/editar negocios, ver/cancelar turnos).
-   `/client` — Vista cliente para reservar turnos.

**Cómo usar**

-   **Modo Admin:** Ir a `/admin`, crear un negocio con nombre, duraciones y rangos horarios por día (ej. 09:00–17:00). Guardar. Desde la misma vista puede ver y cancelar turnos.
-   **Modo Cliente:** Ir a `/client`, seleccionar un negocio, elegir fecha, duración y uno de los horarios disponibles. Completar nombre (recomendado email/teléfono) y confirmar la reserva.

**Persistencia y prevención de conflictos**

-   Las reservas se guardan en `localStorage` y el sistema comprueba antes de reservar que el mismo horario no esté ya tomado (prevención de doble reserva).

**Tema y accesibilidad**

-   Se incluye un toggle en la cabecera para alternar entre modo claro y oscuro; la preferencia se guarda en `localStorage`.
-   Variables CSS para colores y clases utilitarias en `app/globals.css`.

**Archivos clave**

-   **Layout y estilos globales:** [app/layout.tsx](app/layout.tsx) • [app/globals.css](app/globals.css)
-   **Admin:** [app/admin/page.tsx](app/admin/page.tsx) • [components/AdminDashboard.tsx](components/AdminDashboard.tsx)
-   **Cliente:** [app/client/page.tsx](app/client/page.tsx) • [components/ClientBooking.tsx](components/ClientBooking.tsx)
-   **Formularios:** [components/BusinessForm.tsx](components/BusinessForm.tsx)
-   **Persistencia:** [lib/storage.ts](lib/storage.ts) • [lib/models.ts](lib/models.ts)
-   **Utilidades UI:** [components/Toast.tsx](components/Toast.tsx) • [components/ThemeToggle.tsx](components/ThemeToggle.tsx)

**Sugerencias y pasos siguientes**

-   Revisión visual y ajustes de espaciados/colores (ya hay un tema base aplicado).
-   Añadir validaciones más estrictas / verificación por email (si se desea persistencia en servidor, integrar backend API).
-   Tests unitarios o E2E para flujos críticos (crear negocio, reservar, cancelar).

**Comandos útiles**

-   Desarrollo: `npm run dev`
-   Build para producción: `npm run build` y `npm run start`

Si quieres, puedo:

-   Crear un `README` más corto en inglés.
-   Añadir un script `seed` para crear datos de prueba.
-   Inicializar un repositorio Git y hacer commits automáticos de los cambios.

---

Actualizado: contenido generado automáticamente para facilitar pruebas locales y desarrollo.
