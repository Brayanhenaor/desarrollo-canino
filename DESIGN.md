# Design System: Desarrollo Canino - Autenticidad Radical Robledo
**Project ID:** 7977654523486129854
**Screen ID:** e5d20878877c4289b3a4ee432fa02f8c

## 1. Visual Theme & Atmosphere
Neo-brutalist artesanal con calidez orgánica: bloques "sticker" de bordes gruesos y esquinas redondeadas conviven con formas "blob" irregulares que imitan recortes hechos a mano. La paleta cálida de crema, verde bosque y amarillo mostaza transmite energía juguetona sin perder seriedad profesional. Todo el layout está ligeramente rotado (-3° a 3°) para sensación de collage físico — como una libreta de adiestramiento hecha a mano, no un catálogo corporativo genérico.

## 2. Color Palette & Roles
| Nombre | Hex | Rol |
|---|---|---|
| Verde Bosque Profundo (Primary) | `#163428` | Texto de marca, botones primarios, bordes gruesos de tarjetas/blobs, fondo del footer |
| Amarillo Mostaza (Secondary Container) | `#fecc00` | Blob decorativo del hero, fondos de botones/badges de alto contraste, acentos |
| Crema Cálido (Background/Surface) | `#fdf9f0` | Fondo base de toda la página |
| Blanco Roto (Surface Container Lowest) | `#ffffff` | Fondo de tarjetas de contenido sobre color |
| Terracota Oscuro (Tertiary Container) | `#792d00` | Botón secundario ("Conoce Nuestras Instalaciones") |
| Café Oscuro (Tertiary) | `#551d00` | Texto/acentos de alto contraste sobre tonos cálidos |
| Durazno Suave (Tertiary Fixed Dim) | `#ffb595` | Blob decorativo secundario, fondo de ícono de servicio |
| Durazno Claro (Tertiary Fixed) | `#ffdbcd` | Blob decorativo terciario |
| Salvia Suave (Primary Fixed Dim) | `#adcebd` | Fondo de ícono de servicio, acento suave sobre verde |
| Verde Menta Claro (Primary Fixed) | `#c8ead8` | Fondo de la sección "El Entorno Perfecto" |
| Coral Claro (Error Container, reutilizado como acento) | `#ffdad6` | Fondo de ícono de servicio "Transporte" |
| Dorado (Secondary Fixed Dim) | `#f0c100` | Fondo del badge de título "Nuestros Servicios" |
| Gris Verdoso (On Surface Variant) | `#424844` | Texto de cuerpo secundario |

## 3. Typography Rules
- **Display / Headlines:** Bricolage Grotesque, peso 800, uppercase, tracking negativo (-0.02em a -0.04em). Usado en H1 del hero (84px desktop / 64px mobile) y H2 de sección (48–60px). Siempre en mayúsculas y con leve rotación (-1° a -3°) para efecto "recorte pegado".
- **Body:** Hanken Grotesk, peso 400, 18px/28px, tracking +0.01em. Los párrafos van casi siempre dentro de una tarjeta "sticker" (fondo blanco, borde grueso) en vez de flotar sobre el fondo.
- **Labels/Badges:** Hanken Grotesk, peso 700, 14px, uppercase, tracking +0.15em ("label-caps"). Usado en nav, botones y badges pill.

## 4. Component Stylings

* **Botones:** Forma píldora (`rounded-full`), borde grueso de 3px en un color de contraste, uppercase, tracking amplio. Efecto **hard-shadow**: sombra sólida (no difusa) que se desplaza al hover (`hard-shadow-hover`) simulando que el botón "se presiona". Primario = fondo verde bosque + texto amarillo; variante invertida = fondo amarillo + texto verde.
* **Blobs decorativos:** Formas orgánicas irregulares (`blob-shape`, `blob-shape-2`, `blob-shape-3`) — no simples círculos — usadas como marco de fotos y como manchas de color de fondo. Fotos van recortadas dentro de un blob con borde de 8px color crema y un segundo contorno de color sólido (`box-shadow` tipo anillo) por fuera.
* **Tarjetas "Sticker":** Fondo blanco/crudo, borde grueso (2–4px) del color primario, esquinas muy redondeadas (`rounded-2xl`/`rounded-3xl`), y una ligera rotación aleatoria por tarjeta (entre -3° y 3°) que se endereza (`rotate-0`) al hover. Sombra sutil tipo "sticker despegándose", no difuminada.
* **Íconos de servicio:** Círculo de color pastel (`rounded-full`, borde 2px verde) conteniendo un ícono ilustrado tipo sticker (silbato, corazón+huella, birrete, bolsa de premios).
* **Badges/Pills:** Fondo de color sólido, borde 2px, texto label-caps, forma píldora. Usados para ubicación, certificaciones y CTAs secundarios.
* **Inputs/Forms:** No presentes en este screen (landing informativa, no formulario).

## 5. Layout Principles
- Ancho máximo de contenido: 1280px, centrado, con `px-margin-desktop` (64px) en desktop y `px-margin-mobile` (16px) en mobile.
- Secciones alternan fondo crema / verde menta claro (`primary-fixed`) para marcar ritmo visual sin usar líneas divisorias duras.
- Alto contraste entre bloques rectos (tarjetas de servicio) y formas orgánicas (blobs de fotos) en la misma sección para evitar monotonía de grid.
- Todo elemento de texto largo (párrafos) vive dentro de una tarjeta con fondo — nunca texto de cuerpo flotando directo sobre fondos de color o imágenes.
- Rotaciones sutiles (-3° a 3°) en casi todos los bloques de contenido para dar sensación de collage armado a mano; se enderezan en hover como micro-interacción.

## 6. Assets originales (Stitch)
- Screenshot completo: `screenshot.png`
- HTML/Tailwind exportado: `screen.html`
- Imágenes: `images/hero-dogs.jpg`, `images/facility-robledo.jpg`, `images/positive-reinforcement.jpg`, `images/dog-illustration-sticker.jpg`, `images/decorative-pattern.jpg`, `images/icon-whistle.jpg`, `images/icon-treat-bag.jpg`, `images/icon-graduation.jpg`, `images/icon-heart.jpg`
