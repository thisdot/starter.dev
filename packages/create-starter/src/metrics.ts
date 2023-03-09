import fetch from "node-fetch";

// TODO: #790 hit the deployed endpoint

// This is the production metircs-tracker url. For the development url please use the development url for dev work:
// const METRICS_TRACK_URL = 'https://05a78mw2c1.execute-api.us-east-1.amazonaws.com/track'; // <-- dev url
const METRICS_TRACK_URL = 'https://47ix8fys9k.execute-api.us-east-1.amazonaws.com/track';
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
