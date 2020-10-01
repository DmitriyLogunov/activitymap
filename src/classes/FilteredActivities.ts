import Activity from "../models/Activity";
import ActivityFilter from "../models/ActivityFilter";

type ActivityWithFilters = {
  activity: Activity,
  isMatching: boolean,
  filters: Array<ActivityFilter>,
}

export default class FilteredActivities {

  private readonly activities: Map<number, Activity>;
  private readonly filters: Array<ActivityFilter>;
  private readonly activitySelection: Map<number, boolean>;

  public addFromArray(activityArray: Array<Activity>): void {
    activityArray.forEach(newActivity => {
      this.activities.set(
        newActivity.id,
        newActivity
      )

      this.activitySelection.set(newActivity.id, true);
    });
  }

  constructor(activities?: Array<Activity>, filters?: Array<ActivityFilter>) {
    this.activities = new Map<number, Activity>();
    this.activitySelection = new Map<number,boolean>();

    if (activities) {
      activities.forEach(newActivity => {
        this.activities.set(
          newActivity.id,
          newActivity
        )

        this.activitySelection.set(
          newActivity.id,
          true
        )
      })
    }

    this.filters = (filters)? filters : Array<ActivityFilter>(0);
  }

  public addFilter(filter: ActivityFilter) {
    this.filters.push(filter);
  }

  public updateFilter(filter: ActivityFilter, index: number) {
    if (index >= this.filters.length || index < 0) {
      throw new Error("Index of filter is out of range.")
    }
    this.filters[index] = filter;
  }

  public deleteFilter(index: number) {
    if (index >= this.filters.length || index < 0) {
      throw new Error("Index of filter is out of range.")
    }
    this.filters.splice(index, 1);
  }

  public updateSelectionState(activityId: number, isSelected: boolean) {
    this.activitySelection.set(activityId, isSelected);
  }

  private matchFilters(activity: Activity): boolean {
    if (!this.activitySelection.get(activity.id)) {
      return false;
    }
    //
    // for (const filterModel of this.filters) {
    //   const filter = filterModel.get();
    //   switch (filter.filterType) {
    //     case "keyValuePair":
    //       const rule = filter.filterRule;
    //       // const activityValue: any = activity[rule.key.toString()];
    //       return true;
    //     case "keyWord":
    //       const searchString = filter.filterRule;
    //       if (!activity.name || !activity.name.includes(searchString)) {
    //         return false;
    //       }
    //   }
    // }

    return true;
  }

  public getFilteredActivitiesAsArray(): Array<ActivityWithFilters> {
    const activityArray = this.getAllAsArray();
    const filteredActivityArray: Array<ActivityWithFilters> = activityArray.map((activity, index) => {
      return {
        activity: activity,
        isMatching: this.matchFilters(activity),
        filters: this.filters,
      };
    })

    return filteredActivityArray;
  }

  public getAllAsArray(): Array<Activity> {
    return Array.from(this.activities.values());
  }


}