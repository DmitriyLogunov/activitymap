import { DetailedAthlete } from "../classes/strava/models/detailed-athlete";

export default interface StoredAuthenticationData {
  accessToken: string;
  tokenType: string;
  athlete?: DetailedAthlete;
  firstName: string;
  expiresAt: number;
  refreshToken: string;
}