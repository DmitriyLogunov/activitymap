import React from "react";
import FilteredActivities from "../classes/FilteredActivities";
import NumberFormat from "react-number-format";

interface ActivitySummaryProps {
  filteredActivities: FilteredActivities;
}

const ActivitySummary = (props: ActivitySummaryProps) => {
  const filteredActivities = props.filteredActivities.getFilteredActivitiesAsArray();

  let count = filteredActivities.length;
  let totalDistance = 0;

  for (const {activity, isMatching} of filteredActivities) {
    if (!isMatching) {
      continue;
    }
    totalDistance += activity.distance;
  }

  return (<div className="activity-summary">
      {count} activities<br/>
      <NumberFormat value={totalDistance/1000} displayType={'text'} thousandSeparator={true} decimalScale={2} /> kilometers
  </div>);
}

export default ActivitySummary;