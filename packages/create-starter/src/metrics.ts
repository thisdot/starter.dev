import fetch from "node-fetch";

// TODO: #790 hit the deployed endpoint
const METRICS_TRACK_URL = 'localhost:3333/track';
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
