import React from "react";
import {Activities} from "../models/Activity";

interface ActivitySummaryProps {
  activities: Activities;
}

const ActivitySummary = (props: ActivitySummaryProps) => {
  const filteredActivities = props.activities.getFiltered();

  let count = filteredActivities.length;
  let totalDistance = 0;

  for (let i=0;i<filteredActivities.length;i++) {
    const summaryActivity = filteredActivities[i].summaryActivity;
    totalDistance += summaryActivity.distance;
  }

  return (<div className="activity-summary">
      Activity summary: {count} activities in total {totalDistance/1000} kilometers
  </div>);
}

export default ActivitySummary;