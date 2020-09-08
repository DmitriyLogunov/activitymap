export default class StravaAPI {
  public static async post(endpoint: string | undefined, parameters: Object) {
    if (typeof(endpoint)==='undefined') {
      throw("App misconfiguration: API endpoint declaration not found. Check your .env file.");
    }

    const response = await fetch(process.env.REACT_APP_STRAVA_API_BASE_URL + endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parameters)
    });

    if (!response.ok) {
      throw("Fetching of Strava API endpoint " + endpoint + " has failed: " + response.statusText);
    }

    const responseData = await response.json();

    return responseData;
  }

  public static async get(endpoint: string | undefined, parameters: Object) {
    if (typeof(endpoint)==='undefined') {
      throw("App misconfiguration: API endpoint declaration not found. Check your .env file.");
    }

    const response = await fetch(
      process.env.REACT_APP_STRAVA_API_BASE_URL + endpoint + "?", // + new URLSearchParams(parameters),
      {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw("Fetching of Strava API endpoint " + endpoint + " has failed: " + response.statusText);
    }

    const responseData = await response.json();

    return responseData;
  }
}