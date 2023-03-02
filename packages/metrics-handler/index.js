

const DEFAULT_RESULT = {
  statusCode: 200
}

const STARTER_KITS_JSON_URL = 'https://raw.githubusercontent.com/thisdot/starter.dev/main/starter-kits.json';
const GOOGLE_MEASUREMENT_PROTOCOL_ENDPOINT = (measurement_id, api_secret) => `https://www.google-analytics.com/debug/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`;

module.exports.handler = async (event) => {
  const { default: fetch } = await import('node-fetch');
  const MEASUREMENT_ID = process.env.GOOGLE_MEASUREMENT_ID;
  const API_SECRET = process.env.GOOGLE_API_SECRET;

  const starterKitsRequest = await fetch(STARTER_KITS_JSON_URL);
  if (!starterKitsRequest.ok) {
    console.log('Could not fetch starter kits for validation, tracking aborted');
    return DEFAULT_RESULT
  }

  const starterKitsJSON = await starterKitsRequest.json();
  const starterKits = new Set()
  if (typeof starterKitsJSON === 'object' && starterKitsJSON !== null) {
    Object.keys(starterKitsJSON).forEach((kit) => starterKits.add(kit))
  }

  if (!starterKits.has(event.selectedKit)) {
    console.log('Invalid starter kit, tracking aborted');
    return DEFAULT_RESULT;
  }

  const trackRequest = await fetch(
    GOOGLE_MEASUREMENT_PROTOCOL_ENDPOINT(MEASUREMENT_ID, API_SECRET),
    {
      method: 'POST',
      body: JSON.stringify({
        // TODO: #790 get client id
        client_id: 'XXXXXXXX.YYYYYYY',
        events: [{
          name: 'create_starter',
          params: event
        }]
      })
    }
  )

  if (trackRequest.ok) {
    const trackRequestResult = await trackRequest.json();
    console.log(trackRequestResult);
  }
  return DEFAULT_RESULT;


};
