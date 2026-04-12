export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, telefono, servicio, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Campos requeridos incompletos.' });
  }

  const servicioLabel = {
    landing:  'Landing Page (Plan Básico)',
    business: 'Sitio Web Business',
    premium:  'Plan Premium',
    redes:    'Redes Sociales',
    email:    'Email Corporativo',
    otro:     'Otro / Consulta'
  }[servicio] || servicio || '—';

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;padding:32px;border-radius:8px;">
      <div style="background:#1a8e8e;padding:20px 24px;border-radius:6px 6px 0 0;">
        <h2 style="color:#fff;margin:0;font-size:1.2rem;">Nuevo contacto desde Creafinity</h2>
      </div>
      <div style="background:#fff;padding:24px;border-radius:0 0 6px 6px;border:1px solid #e5e7eb;">
        <table style="width:100%;border-collapse:collapse;font-size:0.95rem;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#6b7280;width:140px;">Nombre</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#6b7280;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;"><a href="mailto:${email}" style="color:#1a8e8e;">${email}</a></td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#6b7280;">Teléfono</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">${telefono || '—'}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#6b7280;">Servicio</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">${servicioLabel}</td></tr>
          <tr><td style="padding:10px 0;color:#6b7280;vertical-align:top;">Mensaje</td><td style="padding:10px 0;line-height:1.6;">${message.replace(/\n/g, '<br>')}</td></tr>
        </table>
      </div>
      <p style="text-align:center;color:#9ca3af;font-size:0.78rem;margin-top:20px;">Creafinity Uruguay — creafinity.com.uy</p>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from:    'Creafinity <contacto@creafinity.com.uy>',
        to:      ['contacto@creafinity.com.uy'],
        replyTo: email,
        subject: `Nuevo contacto: ${name}`,
        html
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend error:', data);
      return res.status(500).json({ success: false, message: 'No se pudo enviar el email.' });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
}
