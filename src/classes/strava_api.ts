import SavedAuthentication from "./saved_authentication";

export default class StravaAPI {

  // TODO store token in the application context and use from there
  private static getToken() {
    const storedAuthenticationdata = localStorage.getItem('authenticationData');
    const authenticationData: SavedAuthentication | null = (storedAuthenticationdata
        ? JSON.parse(storedAuthenticationdata)
        : null
    )

    let isAuthenticated = false;
    if (authenticationData && (Date.now() < authenticationData.expiresAt)) {
      return authenticationData.accessToken;
    } else {
      return null;
    }
  }

  // TODO add token usage here
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

  public static async get(endpoint: string | undefined) {
    if (typeof(endpoint)==='undefined') {
      throw("App misconfiguration: API endpoint declaration not found. Check your .env file.");
    }

    const response = await fetch(
      process.env.REACT_APP_STRAVA_API_BASE_URL + endpoint,
      {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorisation': tokenType + 'Bearer ' + this.getToken(),
      }
    });

    if (!response.ok) {
      throw("Fetching of Strava API endpoint " + endpoint + " has failed: " + response.statusText);
    }

    const responseData = await response.json();

    return responseData;
  }
}