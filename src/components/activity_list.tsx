import React from "react";
import Activities from "../classes/activities";
import withLoadingIndicator, {WithLoadingIndicatorProps} from "./with_loading_indicator";

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