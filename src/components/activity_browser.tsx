import React, {useEffect, useState} from "react";
import '../styles/activity_browser.css';
import ActivityMap from "./activity_map";
import StravaAPI from "../classes/strava/strava_api";
import {SummaryActivity} from "../classes/strava/models";
import Activities from "../classes/activities";
import ActivitySummary from "./activity_summary";
import SidePanel from "./side_panel";
import BottomPanel from "./bottom_panel";
import ActivityList from "./activity_list";
import ActivityQueriesWidget from "./activity_queries_widget";
import withActivityFilters from "./withActivityFilters";
import ActivityFilter from "../models/ActivityFilter";
import {ActivityQuery} from "../models/ActivityQuery";
import ActivityFilterEditor from "./ActivityFilterEditor";
import ActivityFilterRenderer from "./ActivityFilterRenderer";
import MultipleSelectionWidget, {MultipleSelectionCombinedProps} from "./multiple_selection_widget";
import withActivityQueries from "./withActivityQueries";

interface ActivityBrowserProps {
}

const ActivityBrowser = (props: ActivityBrowserProps) => {
  const [activities, setActivities] = useState(new Activities());

  const newQuery: ActivityQuery = {
    maxCount: 50,
    before: null,
    after: null,
    includePrivate: false,
  }

  const [queries, setQueries] = useState<Array<ActivityQuery>>([newQuery]);

  useEffect(() => {
    // TODO query from queries array
    (async () => {
      const newStravaActivities: Array<SummaryActivity> = await StravaAPI.get('/athlete/activities');
      const newActivities = new Activities();
      newActivities.add(newStravaActivities, true);
      setActivities(newActivities);
    })();
  }, [queries]);

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
      <ActivityMap activities={activities} />
      <SidePanel>
        <h3>Select activities:</h3>
        <ActivityQueriesWidget itemArray={queries} newItemDefaults={newQuery} onItemUpdate={handleQueryUpdate}/>
        <h3>Apply filters:</h3>
        <ActivityFiltersWidget itemArray={new Array<ActivityFilter>()} newItemDefaults={new ActivityFilter({filterType: "keyWord", filterRule: "foo"})} onItemUpdate={handleActivityFilterUpdate}/>
        <h3>Activity list:</h3>
        <ActivityList activities={activities} />
      </SidePanel>
      <BottomPanel>
        <ActivitySummary activities={activities} />
      </BottomPanel>
    </div>
  )
}

export default ActivityBrowser;
