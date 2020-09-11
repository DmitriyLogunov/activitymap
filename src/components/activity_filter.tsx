import React from "react";
import Activities from "../classes/activities";

interface ActivityfilterProps {
  activities: Activities;
}

const ActivityFilter = (props: ActivityfilterProps) => {
  return (<div className="activity-filter">
    <ul>
      {props.activities.get().map(activity => {return (
        <li key={activity.summaryActivity.id}>{activity.summaryActivity.name}</li>
      )})}
    </ul>
  </div>);
}

export default ActivityFilter;