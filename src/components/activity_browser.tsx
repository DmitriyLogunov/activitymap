import React, {useEffect, useState} from "react";
import '../styles/activity_browser.css';
import ActivityMap from "./activity_map";
import StravaAPI from "../classes/strava/strava_api";
import {SummaryActivity} from "../classes/strava/models";
import Activities from "../classes/activities";
import ActivitySummary from "./activity_summary";
import SidePanel from "./side_panel";
import BottomPanel from "./bottom_panel";
import ActivitySelectionWidget, {ActivityQuery, ActivityQueryArray} from "./activity_selection_widget";
import ActivityFilterWidget from "./activity_filter_widget";
import ActivityList from "./activity_list";

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

  const [queries, setQueries] = useState<ActivityQueryArray>([newQuery]);

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

  // const activityFilterWidget = <ActivityFilterWidget activities={activities} />;

  // const ActivityFilterWidget = withEditableElements(ActivityFilterWidget, ActivityFilterForm);


  return (
    <div className="activity-browser">
      <ActivityMap activities={activities} />
      <SidePanel>
        <ActivitySelectionWidget queries={queries} newQuery={newQuery} onQueryUpdate={handleQueryUpdate}/>
        <ActivityFilterWidget activities={activities} />
        <ActivityList activities={activities} />
      </SidePanel>
      <BottomPanel>
        <ActivitySummary activities={activities} />
      </BottomPanel>
    </div>
  )
}

export default ActivityBrowser;
