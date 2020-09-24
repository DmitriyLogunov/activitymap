import {SummaryActivity} from "../classes/strava/models";

export default interface Activity extends SummaryActivity {};

export class Activities {
  protected activities: Map<number, Activity>;

  constructor(copyFrom?: Activities) {
    this.activities = new Map<number, Activity>();
    if (copyFrom) {
      this.activities = new Map<number, Activity>();
      copyFrom.get().forEach((activity, key) => {
        this.activities.set(key, activity);
      })
    }
  }

  public add(newActivities: Array<Activity>):void {
    newActivities.forEach(newActivity =>
      this.activities.set(
        newActivity.id,
        newActivity
      )
    );
  }

  public clear():void {
    this.activities = new Map<number, Activity>();
  }

  public get(): Map<number, Activity> {
    return this.activities;
  }

  public getAsArray(): Array<Activity> {
    return Array.from(this.activities.values());
  }

}