import React from "react";
import withLoadingIndicator, {WithLoadingIndicatorProps} from "../hoc/withLoadingIndicator";
import {Activities} from "../models/Activity";

interface ActivityListProps extends WithLoadingIndicatorProps {
  activities: Activities;
}

const ActivityList = withLoadingIndicator((props: ActivityListProps) => {
  props.showIndicator();

  return (<div className="activity-list">
    <ul>
      {props.activities.get().map(activity => {return (
        <li key={activity.summaryActivity.id}>{activity.summaryActivity.name}</li>
      )})}
    </ul>
  </div>);
});

export default ActivityList;