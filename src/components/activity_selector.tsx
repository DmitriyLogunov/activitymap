import React from "react";
import Activities from "../classes/activities";

interface ActivitySelectorProps {
  activities: Activities;
}

const ActivitySelector = (props: ActivitySelectorProps) => {
  return (<div className="activity-selector">
    <ul>
      {props.activities.get().map(activity => {return (
        <li>{activity.summaryActivity.name}</li>
      )})}
    </ul>
  </div>);
}

export default ActivitySelector;