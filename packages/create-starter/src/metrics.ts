import fetch from "node-fetch";

// TODO: #790 hit the deployed endpoint
const METRICS_TRACK_URL = 'https://05a78mw2c1.execute-api.us-east-1.amazonaws.com/track';
export async function trackSelectedKit(kit: string): Promise<void> {
  try {
    await fetch(METRICS_TRACK_URL, {
      method: 'POST',
      body: JSON.stringify({
        selectedKit: kit
      })
    })

  } catch (error) {
    // We suppress every error and don't log them into the console.
  }
}
