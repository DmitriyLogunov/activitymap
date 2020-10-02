import React, {ChangeEvent} from "react";
import FilteredActivities from "../classes/FilteredActivities";
import Activity from "../models/Activity";

interface ActivityCSVProps {
  filteredActivities: FilteredActivities;
}

const ActivityCSV = (props: ActivityCSVProps) => {
  const activities = props.filteredActivities.getFilteredActivitiesAsArray();

  if (activities.length==0) {
    return <></>;
  }

  let csvKeyString = '';
  for (const key of Object.getOwnPropertyNames(activities[0].activity)) {
    csvKeyString += key + ','
  }
  csvKeyString = csvKeyString.slice(0, -1);

  return (<div className="activity-csv">
    <pre>
      {csvKeyString}
      {activities.map(({activity, isMatching}) => {
          let csvString = "";
          if (isMatching) {
            for (const key of Object.getOwnPropertyNames(activity)) {
                const value = activity[key as keyof Activity];
                if (typeof value !== 'object') {
                  csvString += value.toString();
                }
                csvString += ",";
            }
            return <>{csvString.slice(0, -1)}<br/></>;
          }
        }
      )}
    </pre>
  </div>);
};

export default ActivityCSV;