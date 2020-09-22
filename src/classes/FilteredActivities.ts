import Activity from "../models/Activity";
import ActivityFilter from "../models/ActivityFilter";

export default class FilteredActivities {
  private readonly activities: Array<Activity>;
  private filters?: Array<ActivityFilter>;

  constructor(activities: Array<Activity>) {
    this.activities = activities;
  }

  public setFilters(filters: Array<ActivityFilter>) {
    this.filters = filters;
  }

  public getFilteredActivities(): Array<Activity> {
    const filteredActivities = new Array<Activity>(0);
    this.activities.forEach((activity) => {
      // TODO: apply filters
      filteredActivities.push(activity);
    })

    return filteredActivities;
  }
}