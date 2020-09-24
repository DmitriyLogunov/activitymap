import React from "react";
import FilteredActivities from "../models/FilteredActivities";

interface ActivitySummaryProps {
  filteredActivities: FilteredActivities;
}

const ActivitySummary = (props: ActivitySummaryProps) => {
  const filteredActivities = props.filteredActivities.getFilteredActivitiesAsArray();

  let count = filteredActivities.length;
  let totalDistance = 0;

  for (let i=0;i<filteredActivities.length;i++) {
    const summaryActivity = filteredActivities[i];
    totalDistance += summaryActivity.distance;
  }

  return (<div className="activity-summary">
      Activity summary: {count} activities in total {totalDistance/1000} kilometers
  </div>);
}

export default ActivitySummary;