import React, {ChangeEvent} from "react";
import withLoadingIndicator, {WithLoadingIndicatorProps} from "../hoc/withLoadingIndicator";
import FilteredActivities from "../classes/FilteredActivities";
import '../styles/ActivityList.scss';

interface ActivityListProps extends WithLoadingIndicatorProps {
  filteredActivities: FilteredActivities;
  onActivitySelectionChange?: (activityId: number, newState: boolean) => {};
}

const ActivityList = withLoadingIndicator((props: ActivityListProps) => {
  props.showIndicator();

  return (<div className="activity-list">
    <ul>
      {props.filteredActivities.getFilteredActivitiesAsArray().map(({activity, isMatching}) => {return (
        <li key={activity.id}>
          <input
            type="checkbox"
            defaultChecked={isMatching}
            onChange={
              (event: ChangeEvent<HTMLInputElement>) => {
                if (props.onActivitySelectionChange) {
                  props.onActivitySelectionChange(activity.id, event.target.checked)
                }
              }
            }
          />
          {activity.name}
        </li>
      )})}
    </ul>
  </div>);
});

export default ActivityList;