import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY || null;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "PUT_REAL_CHANNEL_ID_HERE";

  // Mask key for safety in debug
  const maskedKey = API_KEY ? (API_KEY.slice(0,4) + "...(masked)..." + API_KEY.slice(-4)) : null;

  if (!API_KEY) {
    return NextResponse.json({ error: "API key missing (process.env.YOUTUBE_API_KEY not set)", hasKey: false });
  }
  if (!CHANNEL_ID || CHANNEL_ID.startsWith("PUT_REAL")) {
    return NextResponse.json({ error: "CHANNEL_ID missing or still placeholder", CHANNEL_ID });
  }

  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`;

  // fetch with timeout / catch errors
  try {
    const resp = await fetch(url);
    const raw = await resp.text(); // get raw for debug
    let data;
    try { data = JSON.parse(raw); } catch(e) { data = { raw }; }

    return NextResponse.json({
      debug: {
        hasKey: !!API_KEY,
        maskedKey,
        channelId: CHANNEL_ID,
        httpStatus: resp.status,
        parsed: data
      }
    });
  } catch (err) {
    return NextResponse.json({ error: "fetch failed", detail: String(err) });
  }
}
