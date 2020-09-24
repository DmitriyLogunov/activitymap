import React from "react";
import withLoadingIndicator, {WithLoadingIndicatorProps} from "../hoc/withLoadingIndicator";
import FilteredActivities from "../models/FilteredActivities";

interface ActivityListProps extends WithLoadingIndicatorProps {
  filteredActivities: FilteredActivities;
}

const ActivityList = withLoadingIndicator((props: ActivityListProps) => {
  props.showIndicator();

  return (<div className="activity-list">
    <ul>
      {props.filteredActivities.getFilteredActivitiesAsArray().map(activity => {return (
        <li key={activity.id}>{activity.name}</li>
      )})}
    </ul>
  </div>);
});

export default ActivityList;