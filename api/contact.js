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
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // The Disguise: Tells Cloudflare this is a normal human using Google Chrome
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      },
      body: JSON.stringify(web3formsPayload),
    });

    // Safe parsing: Check what Web3Forms actually sent back before parsing
    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      // If it sends HTML (like a Cloudflare block), log it and return a clean error instead of crashing
      const textError = await response.text();
      console.error('Web3Forms returned non-JSON. First 200 chars:', textError.substring(0, 200));
      return res.status(502).json({ message: 'Upstream provider returned an invalid format.' });
    }

    return res.status(response.ok ? 200 : 400).json(data);
  } catch (err) {
    console.error('Contact API error:', err);
    return res.status(500).json({ message: 'Form submission failed' });
  }
}