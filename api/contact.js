export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return res
      .status(500)
      .json({ message: 'Server misconfigured: missing WEB3FORMS_ACCESS_KEY' });
  }

  try {
    const body = req.body ?? {};
    const { name, email, message } = body;

    // Basic validation
    if (!email || !message) {
      return res
        .status(400)
        .json({ message: 'Missing required fields: email, message' });
    }

    // Optional honeypot (if your Angular sends "website")
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      return res.status(400).json({ message: 'Bot detected' });
    }

    const web3formsPayload = {
      access_key: accessKey,
      subject: body.subject ?? 'New lead — SimpliCreate',
      from_name: 'SimpliCreate Website',
      name: name ?? '',
      email,
      message,
      // include any extra fields you send
      ...body,
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(web3formsPayload),
    });

    const data = await response.json();

    // Return provider response (keeps debugging easy)
    return res.status(response.ok ? 200 : 400).json(data);
  } catch (err) {
    console.error('Contact API error:', err);
    return res.status(500).json({ message: 'Form submission failed' });
  }
}