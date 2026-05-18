# Mi Álbum Mundial 2026 📘⚽

Tracker offline para el álbum **Panini Mundial 2026** con:
- ✅ Detector automático de láminas por foto
- ✅ Sistema de repetidas
- ✅ Perfiles múltiples (uno por persona)
- ✅ Compartir e intercambiar listas por WhatsApp
- ✅ Funciona offline una vez abierta

---

## 🚀 Cómo publicar la app (GitHub Pages, gratis)

### Paso 1: Crear cuenta GitHub (si no tienes)

1. Entra a [github.com](https://github.com) → **Sign up**
2. Elige un nombre de usuario (será parte del link público — ej. `juanperez` → `https://juanperez.github.io/...`)
3. Confirma tu email

### Paso 2: Crear el repositorio

1. Ya logueado, arriba a la derecha tap **`+`** → **New repository**
2. Configuración:
   - **Repository name**: `album-mundial-2026` (o el nombre que quieras — esto irá en el link)
   - **Visibility**: ✅ **Public** (importante: Pages gratis requiere público)
   - ✅ Marca **Add a README file** (para que el repo no esté vacío)
   - Resto en default
3. Tap **Create repository**

### Paso 3: Subir los archivos

Ya estás en la página del repo recién creado.

1. Tap el botón **Add file** → **Upload files**
2. Arrastra (o selecciona) **todos estos archivos**:
   - `index.html`
   - `manifest.json`
   - `service-worker.js`
   - `icon-192.png`
   - `icon-512.png`
   - `icon-512-maskable.png`
3. Abajo del todo, en el campo de "Commit changes" tap **Commit changes**

### Paso 4: Activar GitHub Pages

1. En el repo, ve a la pestaña **Settings** (arriba a la derecha)
2. En el menú lateral izquierdo, tap **Pages**
3. En **Source**:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
   - Tap **Save**
4. Espera 1-2 minutos. Cuando refresques verás:
   > ✅ Your site is live at `https://TUUSUARIO.github.io/album-mundial-2026/`

### Paso 5: Compartir el link

Ese link funciona en cualquier celular o computadora:
- 📲 Mándalo por WhatsApp, Telegram, etc.
- 🏠 Al tap del link, abre la app
- 📱 El navegador ofrecerá "Agregar a pantalla de inicio" → ícono propio
- ✈️ Una vez abierta, funciona offline

---

## 🔄 Actualizar la app después

Cuando quieras cambiar algo (corregir, agregar funciones):

1. Edita los archivos localmente (`index.html`, etc.)
2. En el repo de GitHub: **Add file** → **Upload files** → sube los modificados
3. Importante: en `service-worker.js`, **incrementa el número de versión** (ej. `v1.0.0` → `v1.0.1`). Esto le avisa a los usuarios "hay una versión nueva" y les muestra un botón para actualizar.
4. Commit changes

Los usuarios verán el banner "🎉 Nueva versión disponible" automáticamente.

---

## 📂 Estructura de archivos

```
album-mundial-2026/
├── index.html                   # La app completa
├── manifest.json                # Configuración PWA
├── service-worker.js            # Cache offline + auto-update
├── icon-192.png                 # Ícono pequeño
├── icon-512.png                 # Ícono grande
└── icon-512-maskable.png        # Ícono para Android adaptativo
```

---

## ❓ Problemas comunes

**"La app no aparece en mi link"** → Esperar 1-2 min más. GitHub Pages tarda en publicar la primera vez.

**"No me deja activar Pages"** → Verifica que el repositorio sea **público** (Settings → General → Danger Zone → Change visibility).

**"Cambié el código pero los usuarios siguen viendo el viejo"** → No incrementaste la versión del service-worker.js. Cámbiala y vuelve a subirlo.
