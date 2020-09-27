import { DetailedAthlete } from "./models/detailed-athlete";

interface AuthenticationData {
  accessToken: string;
  tokenType: string;
  athlete?: DetailedAthlete;
  firstName: string;
  expiresAt: number;
  refreshToken: string;
}

export default class StravaAPI {
  // TODO refactor token storage
  public static getToken() {
    const storedAuthenticationdata = localStorage.getItem('authenticationData');
    const authenticationData: AuthenticationData | null = (storedAuthenticationdata
        ? JSON.parse(storedAuthenticationdata)
        : null
    )

    let isAuthenticated = false;
    if (authenticationData && (Date.now() < authenticationData.expiresAt)) {
      return [authenticationData.accessToken, authenticationData.tokenType];
    } else {
      return [null, null];
    }
  }

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

  // public static async get(endpoint: string | undefined) {
  //   if (typeof(endpoint)==='undefined') {
  //     throw("App misconfiguration: API endpoint declaration not found. Check your .env file.");
  //   }
  //
  //   const [token, tokenType] = this.getToken();
  //
  //   const response = await fetch(
  //     process.env.REACT_APP_STRAVA_API_BASE_URL + endpoint,
  //     {
  //     method: 'GET',
  //     mode: 'cors',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': tokenType + ' ' + token,
  //     }
  //   });
  //
  //   if (!response.ok) {
  //     throw("Fetching of Strava API endpoint " + endpoint + " has failed: " + response.statusText);
  //   }
  //
  //   const responseData = await response.json();
  //
  //   return responseData;
  // }
}