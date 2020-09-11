import React, {useEffect, useState} from "react";
import ActivityMap from "./activity_map";
import StravaAPI from "../classes/strava/strava_api";
import {SummaryActivity} from "../classes/strava/models";
import ActivitySelector from "./activity_selector";

interface ActivityBrowserProps {

}

const ActivityBrowser = (props: ActivityBrowserProps) => {
  const [activities, setActivities] = useState(Array<SummaryActivity>(0));

  useEffect(() => {
    const setActivitiesToLatest = async () => {
      const newActivities: Array<SummaryActivity> = await StravaAPI.get('/athlete/activities');
      setActivities(newActivities);
    }

    setActivitiesToLatest();
  }, []);

  return (
    <>
      <ActivitySelector activities={activities} />
      <ActivityMap activities={activities} />
    </>
  )
}

export default ActivityBrowser;
