import React, {useEffect} from "react";
import ActivityMapView, {Activity} from "./activity_map_view";

interface ActivityMapProps {

}

const ActivityMap = (props: ActivityMapProps) => {
  const activities = Array<Activity>(0);

  useEffect(() => {
    // await stravaAPIGet()
    // activities =
  }, []);

  return (
    <ActivityMapView activities={activities} />
  )
}

export default ActivityMap;
