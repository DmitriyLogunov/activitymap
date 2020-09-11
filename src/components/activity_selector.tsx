import React from "react";
import {SummaryActivity} from "../classes/strava/models";

interface ActivitySelectorProps {
  activities: Array<SummaryActivity>;
}

const ActivitySelector = (props: ActivitySelectorProps) => {
  return (<div className="activity-selector">
    <ul>
      {props.activities.map(activity => {return (
        <li>{activity.name}</li>
      )})}
    </ul>
  </div>);
}

export default ActivitySelector;