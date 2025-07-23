import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/contacto', async (req, res) => {
  const { nombre, empresa, email, telefono, motivo, mensaje } = req.body;
  if (!nombre || !email || !telefono || !motivo || !mensaje) {
    return res.status(400).json({ ok: false, error: 'Faltan campos obligatorios.' });
  }

  const toEmails = process.env.TO_EMAILS || '';
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  const mailOptions = {
    from: `Contacto GRICOP <${process.env.GMAIL_USER}>`,
    to: toEmails,
    cc: email, // Copia al remitente
    subject: `Nuevo contacto desde la web: ${motivo}`,
    html: `<h2>Nuevo mensaje de contacto</h2>
      <p><b>Nombre:</b> ${nombre}</p>
      <p><b>Empresa:</b> ${empresa || '-'} </p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Teléfono:</b> ${telefono}</p>
      <p><b>Motivo:</b> ${motivo}</p>
      <p><b>Mensaje:</b><br>${mensaje.replace(/\n/g, '<br>')}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ ok: true, message: 'Mensaje enviado correctamente.' });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Error al enviar el correo.' });
  }
});

app.get('/', (req, res) => {
  res.send('API de contacto GRICOP funcionando.');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
