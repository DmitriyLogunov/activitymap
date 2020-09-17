import React, {useEffect, useState} from "react";
import '../styles/activity_browser.css';
import ActivityMap from "./activity_map";
import StravaAPI from "../classes/strava/strava_api";
import {SummaryActivity} from "../classes/strava/models";
import Activities from "../classes/activities";
import ActivitySummary from "./activity_summary";
import SidePanel from "./side_panel";
import BottomPanel from "./bottom_panel";
import ActivityFilterWidget from "./activity_filter_widget";
import ActivityList from "./activity_list";
import {ActivityQuery} from "./with_activity_queries";
import ActivityQueriesWidget from "./activity_queries_widget";

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
    // TODO find difference between old and new selection data and possibly decide that API call to Strava isn't needed
    // e.g. instead of 50 activities, loading 10 with rest of query being same, or reducing date range
    // check what state update lifecycle method can be used for this

    // setQueries()
  }

  return (
    <div className="activity-browser">
      <ActivityMap activities={activities} />
      <SidePanel>
        <h3>Select activities:</h3>
        <ActivityQueriesWidget data={queries} newItemDefaultValue={newQuery} onQueryUpdate={handleQueryUpdate}/>
        <h3>Apply filters:</h3>
        <ActivityFilterWidget activities={activities} />
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
