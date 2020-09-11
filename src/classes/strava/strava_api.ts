import { DetailedAthlete } from "./models/detailed-athlete";

interface AuthenticationData {
  accessToken: string;
  tokenType: string;
  athlete?: DetailedAthlete;
  firstName: string;
  expiresAt: number;
  refreshToken: string;
}
//
// export interface Map {
//   id: string,
//   resource_state: number,
//   summary_polyline: string,
// }
//
// export interface Activity {
//   distance: number,
//   elapsed_time: number,
//   elev_high: number,
//   elev_low: number,
//   start_latlng: Array<number>,
//   start_latitude: number,
//   start_longitude: number,
//   end_latlng: Array<number>,
//   end_latitude: number,
//   end_longitude: number,
//   gear_id: string,
//   map: Map,
//   name: string,
//   type: string,
//   total_photo_count: number,
//   utc_offset: number,
// }

export default class StravaAPI {
  // TODO store token in the application context and use from there
  private static getToken() {
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

    const [token, tokenType] = this.getToken();

    const response = await fetch(
      process.env.REACT_APP_STRAVA_API_BASE_URL + endpoint,
      {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': tokenType + ' ' + token,
      }
    });

    if (!response.ok) {
      throw("Fetching of Strava API endpoint " + endpoint + " has failed: " + response.statusText);
    }

    const responseData = await response.json();

    return responseData;
  }
}