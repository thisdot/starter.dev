function responseHelper(body) {
  return {
    statusCode: 200,
    body: JSON.stringify(body),
  };
}

const STARTER_KITS_JSON_URL = 'https://raw.githubusercontent.com/thisdot/starter.dev/main/starter-kits.json';
const GOOGLE_MEASUREMENT_PROTOCOL_ENDPOINT = (measurement_id, api_secret) => `https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`;

module.exports.handler = async (event) => {
  const MEASUREMENT_ID = process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID;
  const API_SECRET = process.env.GOOGLE_ANALYTICS_API_SECRET;
  const selectedStarterKit = JSON.parse(event.body || 'null')?.starterKit;

  if (!selectedStarterKit) {
    console.log('No kit found');
    return responseHelper('No kit found');
  }
  const starterKitsRequest = await fetch(STARTER_KITS_JSON_URL);
  if (!starterKitsRequest.ok) {
    console.log('Could not fetch starter kits for validation, tracking aborted');
    return responseHelper('Could not fetch starter kits for validation, tracking aborted')
  }

  const starterKitsJSON = await starterKitsRequest.json();
  const starterKits = new Set()
  if (typeof starterKitsJSON === 'object' && starterKitsJSON !== null) {
    Object.keys(starterKitsJSON).forEach((kit) => starterKits.add(kit))
  }

  if (!starterKits.has(selectedStarterKit)) {
    console.log('Invalid starter kit, tracking aborted');
    return responseHelper('Invalid starter kit, tracking aborted');
  }

  const trackRequest = await fetch(
    GOOGLE_MEASUREMENT_PROTOCOL_ENDPOINT(MEASUREMENT_ID, API_SECRET),
    {
      method: 'POST',
      body: JSON.stringify({
        // The client-id is hardcoded to be a valid client id.
        client_id: '1950771894.1657295956',
        events: [{
          name: 'create_starter',
          params: { selectedStarterKit }
        }]
      })
    }
  )

  if (!trackRequest.ok) {
    console.log(`Track request returned with status ${trackRequest.status} - ${trackRequest.statusText}`);
    return responseHelper(`Track request returned with status ${trackRequest.status} - ${trackRequest.statusText}`);
  }
  return responseHelper('Successful tracking');
};
