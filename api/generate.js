// This file runs on Vercel's servers, NOT the user's browser.
// Scrapers and bots cannot see the code or the API key here.

export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY; // This comes from Vercel's secret settings
  
  if (!apiKey) {
    return res.status(500).json({ error: "API Key not configured on server." });
  }

  const { prompt, systemInstruction } = req.body;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to communicate with Gemini." });
  }
}