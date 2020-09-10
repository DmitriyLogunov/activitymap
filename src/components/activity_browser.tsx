import React, {useEffect, useState} from "react";
import ActivityMapView, {Activity} from "./activity_map_view";
import StravaAPI from "../classes/strava_api";

interface ActivityMapProps {

}

const ActivityMap = (props: ActivityMapProps) => {
  const [activities, setActivities] = useState(Array<Activity>(0));

  useEffect(() => {
    const setActivitiesToLatest = async () => {
      const newActivities =await StravaAPI.get('/athlete/activities');

      setActivities(newActivities);
    }

    setActivitiesToLatest();

  }, []);

  return (
    <ActivityMapView activities={activities} />
  )
}

export default ActivityMap;
