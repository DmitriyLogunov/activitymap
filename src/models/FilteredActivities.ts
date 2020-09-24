import Activity, {Activities} from "./Activity";
import ActivityFilter from "./ActivityFilter";

export default class FilteredActivities extends Activities {
  private filters: Array<ActivityFilter>;

  constructor(activities: Activities) {
    super(activities);
    this.filters = Array<ActivityFilter>(0);
  }

  public setFilters(filters: Array<ActivityFilter>) {
    this.filters = filters;
  }

  public getFilteredActivitiesAsArray(): Array<Activity> {
    return this.getAsArray();

    // TODO: apply filters
    // const filteredActivities = new Array<Activity>(0);
    //
    // this.activities.forEach((activity) => {
    //
    //   filteredActivities.push(activity);
    // })
    //
    // return filteredActivities;
  }

  // private applyFilters(activity: Activity) {
  //   if (!activity.isSelected) {
  //     return false;
  //   }
  //
  //   // TODO: apply other filters
  //
  //   return true;
  // }
  // public getFiltered(): Array<Activity> {
  //   return this.activities.filter(this.applyFilters);
  // }

}