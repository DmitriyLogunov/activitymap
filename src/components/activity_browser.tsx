import React, {useEffect, useState} from "react";
import ActivityMap from "./activity_map";
import StravaAPI, {Activity} from "../classes/strava_api";

interface ActivityBrowserProps {

}

const ActivityBrowser = (props: ActivityBrowserProps) => {
  const [activities, setActivities] = useState(Array<Activity>(0));

  useEffect(() => {
    const setActivitiesToLatest = async () => {
      const newActivities: Array<Activity> = await StravaAPI.get('/athlete/activities');
      setActivities(newActivities);
    }

    setActivitiesToLatest();
  }, []);

  return (
    <ActivityMap activities={activities} />
  )
}

export default ActivityBrowser;
