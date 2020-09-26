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

interface SavedQueryResponse {
  query: ActivityQuery,
  data: Array<SummaryActivity>,
}

interface ActivityBrowserState {
  activities: Activities;
  queries: Array<ActivityQuery>;
  savedResponses: Array<SavedQueryResponse | null>;
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
    savedResponses: [],
  });

  const saveActivityResponse = (query: ActivityQuery, index: number, data: Array<SummaryActivity>) => {
    const newSavedResponses = state.savedResponses.slice();

    while (index >= newSavedResponses.length) {
      newSavedResponses.push(null);
    }

    newSavedResponses[index] = {
      query: query,
      data: data,
    }

    setState({
      ...state,
      savedResponses: newSavedResponses
    })
  }

  const getSavedActivityQueryResponse = (query: ActivityQuery, index: number): Array<SummaryActivity> | null => {
    const savedResponse = state.savedResponses[index];
    if (savedResponse) {
      if (query.key === savedResponse.query.key) {
        return savedResponse.data;
      }
    }

    return null;
  }

  useEffect(() => {
    (async () => {
      const newStravaActivities: Activities = new Activities();
      await Promise.all(
        state.queries.map(async (query, index: number) => {
          let savedResponse = getSavedActivityQueryResponse(query, index);

          if (savedResponse) {
            newStravaActivities.add(savedResponse);
          } else {
            const returnedActivities: Array<Activity> = await StravaAPI.get('/athlete/activities');
            newStravaActivities.add(returnedActivities);
            saveActivityResponse(query, index, returnedActivities);
          }
        })
      );

      setState({
        ...state,
        activities: newStravaActivities
      });
    })();
  }, [state.queries]);

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

  const handleActivityFilterUpdate = (item: ActivityFilter, index: number) => {
  }

  const ActivityQueriesWidget = withActivityQueries(MultipleSelectionWidget);
  const ActivityFiltersWidget = withActivityFilters(MultipleSelectionWidget);

  // TODO apply filters and move into updater func
  const filteredActivities = new FilteredActivities(state.activities);

  return (
    <div className="activity-browser">
      <ActivityMap filteredActivities={filteredActivities} />
      <SidePanel>
        <h3>Select activities:</h3>
        <ActivityQueriesWidget itemArray={state.queries} newItem={new ActivityQuery(queryDefaults)} onItemUpdate={handleQueryUpdate} onItemAdd={handleQueryAdd} onItemDelete={handleQueryDelete}/>
        <h3>Apply filters:</h3>
        <ActivityFiltersWidget itemArray={new Array<ActivityFilter>()} newItem={new ActivityFilter({filterType: "keyWord", filterRule: "foo"})} onItemUpdate={handleActivityFilterUpdate}/>
        <h3>Activity list:</h3>
        <ActivityList filteredActivities={filteredActivities} />
      </SidePanel>
      <BottomPanel>
        <ActivitySummary filteredActivities={filteredActivities} />
      </BottomPanel>
    </div>
  )
}

export default ActivityBrowser;
