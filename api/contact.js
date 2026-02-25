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

    // Convert your JSON payload into Form-Encoded data
    const formData = new URLSearchParams();
    formData.append('access_key', accessKey);
    formData.append('name', name ?? '');
    formData.append('email', email);
    formData.append('message', message);
    formData.append('subject', body.subject ?? 'New lead — SimpliCreate');
    formData.append('from_name', 'SimpliCreate Website');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        // We do NOT set Content-Type here; fetch will auto-set it for URLSearchParams
      },
      body: formData,
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