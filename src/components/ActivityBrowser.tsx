import React, {useEffect, useState} from "react";
import '../styles/ActivityBrowser.css';
import ActivityMap from "./ActivityMap";
import StravaAPI from "../classes/strava/StravaAPI";
import {SummaryActivity} from "../classes/strava/models";
import ActivitySummary from "./ActivitySummary";
import SidePanel from "./SidePanel";
import BottomPanel from "./BottomPanel";
import ActivityList from "./ActivityList";
import withActivityFilters from "../hoc/withActivityFilters";
import ActivityFilter from "../models/ActivityFilter";
import ActivityQuery, {ActivityQueryData} from "../models/ActivityQuery";
import MultipleSelectionWidget from "./MultipleSelectionWidget";
import withActivityQueries from "../hoc/withActivityQueries";
import Activity, {Activities} from "../models/Activity";
import FilteredActivities from "../models/FilteredActivities";
import ActivityLoader from "./ActivityLoader";


interface ActivityBrowserState {
  activities: Activities;
  queries: Array<ActivityQuery>;
  filters: Array<ActivityFilter>;
}

interface ActivityBrowserProps {
  includePrivateActivities: boolean;
}

const ActivityBrowser = (props: ActivityBrowserProps) => {
  const queryDefaults: ActivityQueryData = {
    selector: {
      type: "latest",
      count: 30,
    },
    includePrivate: props.includePrivateActivities,
  };

  const [state, setState] = useState<ActivityBrowserState>({
    activities: new Activities(),
    queries: [new ActivityQuery(queryDefaults)],
    filters: [],
  });

  const handleQueryUpdate = (newQueryData: ActivityQuery, index: number) => {
    // TODO find difference between old and new selection itemArray and possibly decide that API call to Strava isn't needed
    // e.g. instead of 50 activities, loading 10 with rest of query being same, or reducing date range
    // check what state update lifecycle method can be used for this

    const newQueries = state.queries.slice();
    newQueries[index] = newQueryData;

    setState({
      ...state,
      queries: newQueries,
    });
  }

  const handleQueryAdd = (newQueryData: ActivityQuery) => {
    const newQueries = state.queries.slice();
    newQueries.push(newQueryData);

    setState({
      ...state,
      queries: newQueries,
    })
  }

  const handleQueryDelete = (index: number) => {
    const newQueries = state.queries.slice();
    newQueries.splice(index, 1);

    setState({
      ...state,
      queries: newQueries,
    })
  }

  const handleActivityListUpdate = (newActivities: Activities) => {
    setState({
      ...state,
      activities: newActivities
    });
  }

  const handleActivityFilterUpdate = (item: ActivityFilter, index: number) => {
  }

  const ActivityQueriesWidget = withActivityQueries(MultipleSelectionWidget);
  const ActivityFiltersWidget = withActivityFilters(MultipleSelectionWidget);

  // TODO apply filters and move into updater func
  const filteredActivities = new FilteredActivities(state.activities);

  return (
    <div className="activity-browser">
      <ActivityLoader queries={state.queries} onActivitiesUpdate={handleActivityListUpdate} />
      <ActivityMap filteredActivities={filteredActivities} />
      <SidePanel side={"left"}>
        <h3>Select activities:</h3>
        <ActivityQueriesWidget itemArray={state.queries} newItem={new ActivityQuery(queryDefaults)} onItemUpdate={handleQueryUpdate} onItemAdd={handleQueryAdd} onItemDelete={handleQueryDelete}/>
        <h3>Apply filters:</h3>
        <ActivityFiltersWidget itemArray={new Array<ActivityFilter>()} newItem={new ActivityFilter({filterType: "keyWord", filterRule: "foo"})} onItemUpdate={handleActivityFilterUpdate}/>
        <h3>Activity summary:</h3>
        <ActivitySummary filteredActivities={filteredActivities} />
      </SidePanel>
      <SidePanel side={"right"}>
        <h3>Activity list:</h3>
        <ActivityList filteredActivities={filteredActivities} />
      </SidePanel>
      <BottomPanel>

      </BottomPanel>
    </div>
  )
}

export default ActivityBrowser;
