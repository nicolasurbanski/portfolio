## Nicolas Urbanski Portfolio 💼

Portfolio to start my journey as a **junior** developer

## 🛠️ Tools used ⚒️
------------------
Tailwind **v4.1**
Astro **5.14**
Resend (formulario de contacto)
Vercel (deploy)
-----------------

## 🚀 Desarrollo

```sh
npm install
npm run dev      # http://localhost:4321
npm run build
```

El formulario de contacto (`src/pages/api/mail.ts`) necesita la variable de entorno
`RESEND_API_KEY` (en un archivo `.env` local y en la configuración del proyecto en Vercel).

Las páginas se generan como HTML estático; solo `/api/mail` corre como función serverless.

## ➕ Agregar un proyecto

Sumá un objeto al array `projects` en `src/components/Projects.astro`
(imagen en `public/img/`).
