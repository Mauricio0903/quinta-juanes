# Quinta Juanes — Sitio Web v2

Rediseño completo del sitio de Quinta Juanes (Calderitas, Chetumal), con cotizador interactivo, asistente virtual con IA y SEO local optimizado.

## Estructura del proyecto
```
/
├── index.html          → página principal (contenido + SEO)
├── styles.css           → estilos (responsive: móvil, tablet, desktop)
├── app.js                → interactividad (menú, cotizador, galería, chat IA)
├── robots.txt
├── sitemap.xml
├── vercel.json           → headers de seguridad y caché
├── .env.example
├── images/                → todas las fotos del lugar
└── api/
    └── chat.js            → función serverless del asistente IA (Gemini)
```

## 1. Cómo desplegar en Vercel

1. Sube esta carpeta a un repositorio de GitHub (reemplaza el actual o crea uno nuevo).
2. En [vercel.com](https://vercel.com), importa el repo. Vercel detecta automáticamente el `/api/chat.js` como función serverless — no necesitas configurar nada extra de framework ("Other" / "Static" está bien).
3. Antes del primer deploy (o después, y vuelves a desplegar), agrega la variable de entorno:
   - Ve a **Project Settings → Environment Variables**
   - Agrega `GEMINI_API_KEY` con tu clave (ver paso 2 abajo)
4. Cuando tengas dominio propio (ej. `quintajuanes.com`), reemplaza las URLs de ejemplo en `index.html` (`og:url`, `canonical`, `sitemap.xml`) por el dominio real.

## 2. Activar el asistente IA (Gemini)

1. Entra a [aistudio.google.com](https://aistudio.google.com) con una cuenta de Google.
2. Crea una API key gratuita (tiene cuota gratuita generosa, suficiente para un negocio con tráfico moderado).
3. Copia esa key y agrégala en Vercel como `GEMINI_API_KEY` (paso 3 arriba).
4. Si en algún momento no configuras la key, el chat sigue funcionando pero muestra un mensaje pidiendo escribir por WhatsApp — nunca se rompe.
5. El asistente **no tiene acceso a un calendario real**: siempre redirige a WhatsApp para confirmar fecha y precio, tal como me indicaste.

## 3. Checklist de SEO local (además de lo ya incluido en el código)

Ya incluido en el sitio:
- [x] JSON-LD `EventVenue` con dirección, geo, teléfono, horario y rating
- [x] JSON-LD `FAQPage` (ayuda a aparecer con "preguntas relacionadas" en Google)
- [x] Meta title/description optimizados con keywords locales
- [x] Open Graph + Twitter Cards
- [x] `sitemap.xml` y `robots.txt`
- [x] Imágenes con `alt` descriptivo y keywords naturales
- [x] HTML semántico (h1 único, jerarquía de h2)

Pendiente de tu lado (no se puede hacer solo con código):
- [ ] **Google Business Profile**: verifica que la categoría sea "Salón de eventos" o "Centro de eventos", agrega las mismas fotos, y que el nombre/dirección/teléfono coincidan exactamente con los del sitio (esto es lo que más pesa para "cerca de mí").
- [ ] Pedir a clientes recientes que dejen reseña mencionando el tipo de evento ("salón para XV años", "boda", etc.) — ayuda al posicionamiento por esas frases.
- [ ] Registrar el sitio en [Google Search Console](https://search.google.com/search-console) y enviar el `sitemap.xml`.
- [ ] Dominio propio (`.com` o `.mx`) en vez de `.vercel.app` — ayuda tanto en SEO como en percepción de marca para tus clientes.

## 4. Cosas que quedaron fuera a propósito

- **Calendario de disponibilidad**: no se incluyó automatización de fechas. El dueño maneja su propio calendario y todo se coordina por WhatsApp, como se indicó.
- **Precios públicos**: se dejó como "cotización personalizada" en todo el sitio y en el asistente IA.
