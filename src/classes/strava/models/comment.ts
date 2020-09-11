import { SummaryAthlete } from './index';

export interface Comment {
  id: number;
  activity_id: number;
  text: string;
  athlete: SummaryAthlete;
  created_at: Date;
}
