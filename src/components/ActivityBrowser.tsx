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
import ActivityQuery from "../models/ActivityQuery";
import MultipleSelectionWidget from "./MultipleSelectionWidget";
import withActivityQueries from "../hoc/withActivityQueries";
import {Activities} from "../models/Activity";

interface ActivityBrowserState {
  activities: Activities;
  queries: Array<ActivityQuery>;
  filters: Array<ActivityFilter>;
}

interface ActivityBrowserProps {
}

const ActivityBrowser = (props: ActivityBrowserProps) => {
  const defaultActivityQuery: ActivityQuery = {
    maxCount: 50,
    before: null,
    after: null,
    includePrivate: false,
  }

  const [state, setState] = useState({
    activities: new Activities(),
    queries: [defaultActivityQuery],
  });

  useEffect(() => {
    (async () => {
      // TODO query from queries array
      const newStravaActivities: Array<SummaryActivity> = await StravaAPI.get('/athlete/activities');
      const newActivities = new Activities();
      newActivities.add(newStravaActivities, true);
      setState({
        ...state,
        activities: newActivities
      });
    })();
  }, [state.queries]);

  const handleQueryUpdate = (oldQueryData: ActivityQuery, index: number) => {
    // TODO find difference between old and new selection itemArray and possibly decide that API call to Strava isn't needed
    // e.g. instead of 50 activities, loading 10 with rest of query being same, or reducing date range
    // check what state update lifecycle method can be used for this

    // setQueries()
  }

  const ActivityQueriesWidget = withActivityQueries(MultipleSelectionWidget);
  const ActivityFiltersWidget = withActivityFilters(MultipleSelectionWidget);

  const handleActivityFilterUpdate = (item: ActivityFilter, index: number) => {
  }

  return (
    <div className="activity-browser">
      <ActivityMap activities={state.activities} />
      <SidePanel>
        <h3>Select activities:</h3>
        <ActivityQueriesWidget itemArray={state.queries} newItemDefaults={defaultActivityQuery} onItemUpdate={handleQueryUpdate}/>
        <h3>Apply filters:</h3>
        <ActivityFiltersWidget itemArray={new Array<ActivityFilter>()} newItemDefaults={new ActivityFilter({filterType: "keyWord", filterRule: "foo"})} onItemUpdate={handleActivityFilterUpdate}/>
        <h3>Activity list:</h3>
        <ActivityList activities={state.activities} />
      </SidePanel>
      <BottomPanel>
        <ActivitySummary activities={state.activities} />
      </BottomPanel>
    </div>
  )
}

export default ActivityBrowser;
