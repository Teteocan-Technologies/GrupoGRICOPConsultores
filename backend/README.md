# Backend de contacto para GRICOP

## ¿Qué hace?
Recibe los datos del formulario de contacto y envía un correo a los destinatarios configurados, con copia al remitente.

## Configuración
1. Renombra `.env.example` a `.env` y pon tus datos reales de Gmail y destinatarios.
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor localmente:
   ```bash
   npm start
   ```

## Variables de entorno
- `GMAIL_USER`: Tu correo de Gmail (debe tener habilitado "acceso de apps menos seguras" o usar App Password si tienes 2FA).
- `GMAIL_PASS`: Contraseña o App Password de Gmail.
- `TO_EMAILS`: Correos destino separados por coma.

## Despliegue
Puedes subir este backend a Render, Railway, Vercel, etc. Solo asegúrate de poner las variables de entorno.

## Endpoint
- POST `/api/contacto`
  - Body JSON: `{ nombre, empresa, email, telefono, motivo, mensaje }`
  - Respuesta: `{ ok: true }` o `{ ok: false, error: '...' }`

## Seguridad
No expongas tu backend sin protección si lo usas en producción. Puedes limitar los orígenes permitidos en el middleware CORS.
