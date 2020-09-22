import {SummaryActivity} from "../classes/strava/models";

export default interface Activity {
  summaryActivity: SummaryActivity,
  isSelected: boolean,
}

// TODO deprecated class - move to ActivityFilter
export class Activities {
  private readonly activities: Array<Activity>;

  constructor(initialActivities: Array<Activity> | null = null) {
    if (initialActivities) {
      this.activities = initialActivities;
    } else {
      this.activities = Array<Activity>(0)
    }
  }

  public add(newActivities: Array<SummaryActivity>, areSelected: boolean = false):void {
    newActivities.map(newActivity => this.activities.push({
      summaryActivity: newActivity,
      isSelected: areSelected,
    }))
  }

  public clear():void {

  }

  private applyFilters(activity: Activity) {
    if (!activity.isSelected) {
      return false;
    }

    // TODO: apply other filters

    return true;
  }

  public get(): Array<Activity> {
    return this.activities;
  }

  public getFiltered(): Array<Activity> {
    return this.activities.filter(this.applyFilters);
  }
}