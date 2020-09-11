import React, {useEffect, useState} from "react";
import ActivityMap from "./activity_map";
import StravaAPI from "../classes/strava/strava_api";
import {SummaryActivity} from "../classes/strava/models";
import ActivitySelector from "./activity_selector";
import Activities from "../classes/activities";
import ActivityFilter from "./activity_filter";
import ActivitySummary from "./activity_summary";

interface ActivityBrowserProps {
}

const ActivityBrowser = (props: ActivityBrowserProps) => {
  const [activities, setActivities] = useState(new Activities());

  useEffect(() => {
    (async () => {
      const newStravaActivities: Array<SummaryActivity> = await StravaAPI.get('/athlete/activities');
      const newActivities = new Activities();
      newActivities.add(newStravaActivities, true);
      setActivities(newActivities);
    })();
  }, []);

  return (
    <>
      <ActivityMap activities={activities} />
      <ActivitySelector activities={activities} />
      <ActivityFilter activities={activities} />
      <ActivitySummary activities={activities} />
    </>
  )
}

export default ActivityBrowser;
