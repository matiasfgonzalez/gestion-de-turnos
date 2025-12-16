# Sistema de Notificaciones

## 📲 Notificaciones por WhatsApp y Email

El sistema ahora permite notificar a los negocios cuando un cliente reserva un turno, utilizando WhatsApp y/o Email como canales de comunicación.

## ✨ Características

### 1. Configuración del Negocio

Al crear o editar un negocio en el panel de administración (`/admin`), ahora puedes configurar:

-   **Email del negocio** (opcional): Para recibir notificaciones por correo electrónico
-   **WhatsApp** (opcional): Número de teléfono con código de país (ej: +54 9 11 1234 5678)

### 2. Flujo de Notificación

Cuando un cliente reserva un turno:

1. Se confirma la reserva exitosamente
2. Si el negocio tiene configurado WhatsApp o Email, aparece un modal con opciones:
    - 📲 **Enviar por WhatsApp** - Abre WhatsApp con un mensaje prearmado
    - 📧 **Enviar por Email** - Abre el cliente de correo con el mensaje listo

### 3. Contenido de las Notificaciones

Las notificaciones incluyen:

-   📅 Negocio
-   👤 Nombre del cliente
-   📆 Fecha de la reserva
-   🕐 Hora del turno
-   ⏱️ Duración
-   💰 Precio (si aplica)
-   📧 Email del cliente (si lo proporcionó)
-   📱 Teléfono del cliente (si lo proporcionó)

## 🚀 Ventajas

✅ **100% Gratis** - No requiere servicios de terceros ni backend
✅ **Sin Backend** - Todo funciona desde el navegador
✅ **Funciona hoy mismo** - No requiere configuración adicional
✅ **Ideal para MVP** - Perfecto para validar el producto
✅ **Mobile & Desktop** - Compatible con todos los dispositivos

## 📝 Formato de los datos

### WhatsApp

El número debe incluir el código de país sin espacios extras. Ejemplos válidos:

-   `+5491123456789` (Argentina)
-   `+34612345678` (España)
-   `+525512345678` (México)

### Email

Cualquier dirección de email válida:

-   `negocio@example.com`
-   `contacto@barberia.com.ar`

## ⚠️ Consideraciones

-   **WhatsApp**: El dueño del negocio debe confirmar el envío con un click (es una limitación de la API web de WhatsApp)
-   **Email**: Depende del cliente de correo configurado en el dispositivo del usuario
-   Si el negocio no tiene configurado ningún canal, el turno se reserva normalmente sin mostrar opciones de notificación

## 🎯 Casos de uso

1. **Solo WhatsApp**: Ideal para negocios que prefieren comunicación instantánea
2. **Solo Email**: Para negocios que prefieren registro por correo
3. **Ambos canales**: Máxima flexibilidad - el cliente elige cómo notificar
4. **Sin canales**: La reserva funciona normal, sin notificaciones automáticas

## 🔄 Flujo completo

```
Cliente selecciona negocio y horario
            ↓
Cliente ingresa sus datos
            ↓
Confirma la reserva
            ↓
[Si hay WhatsApp o Email configurado]
            ↓
Aparece modal "Avisar al negocio"
            ↓
Cliente elige: WhatsApp o Email
            ↓
Se abre WhatsApp/Email con mensaje listo
            ↓
Cliente confirma el envío
            ↓
Negocio recibe la notificación
```

## 🛠️ Implementación Técnica

### Archivos modificados:

-   `lib/models.ts` - Modelo de datos actualizado
-   `components/BusinessForm.tsx` - Formulario con campos de contacto
-   `components/ClientBooking.tsx` - Sistema de notificaciones

### APIs utilizadas:

-   **WhatsApp Click to Chat**: `https://wa.me/{número}?text={mensaje}`
-   **Mailto**: `mailto:{email}?subject={asunto}&body={cuerpo}`

Ambas son APIs estándar y funcionan sin configuración adicional.
