export interface AthleteData {
  badge_type_id: number;
  city: string;
  country: string;
  created_at: string;
  firstname: string;
  follower: boolean | null;
  friend: boolean | null;
  id: number;
  lastname: string;
  premium: boolean;
  profile: string; // url
  profile_medium: string; // url
  resource_state: number;
  sex: string;
  state: string;
  summit: boolean;
  updated_at: string;
  username: string;
}

export default interface SavedAuthentication {
  accessToken: string;
  athlete?: AthleteData;
  firstName: string;
  expiresAt: number;
  refreshToken: string;
}