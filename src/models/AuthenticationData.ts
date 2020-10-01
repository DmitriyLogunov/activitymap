import { DetailedAthlete } from "../classes/strava/models/detailed-athlete";

export default interface AuthenticationData {
  accessToken: string;
  tokenType: string;
  athlete?: DetailedAthlete;
  firstName: string;
  expiresAt: number;
  refreshToken: string;
}

export function getToken() {
  const authenticationDataFromStorage = localStorage.getItem('authenticationData');
  const authenticationData: AuthenticationData | null = (authenticationDataFromStorage
      ? JSON.parse(authenticationDataFromStorage)
      : null
  )

  if (authenticationData && (Date.now() < authenticationData.expiresAt)) {
    return [authenticationData.accessToken, authenticationData.tokenType];
  } else {
    return [null, null];
  }
}


