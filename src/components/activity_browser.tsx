import React, {useEffect, useState} from "react";
import '../styles/activity_browser.css';
import ActivityMap from "./activity_map";
import StravaAPI from "../classes/strava/strava_api";
import {SummaryActivity} from "../classes/strava/models";
import Activities from "../classes/activities";
import ActivityFilter from "./activity_filter";
import ActivitySummary from "./activity_summary";
import SidePanel from "./side_panel";
import ActivitySelectionForm from "./activity_selection_form";
import BottomPanel from "./bottom_panel";
import ActivitySelectionData from "../classes/activity_selection_data";
import ActivitySelectionWidget from "./activity_selection_widget";

interface ActivityBrowserProps {
}

const ActivityBrowser = (props: ActivityBrowserProps) => {
  const [activities, setActivities] = useState(new Activities());
  const [selection, setSelection] = useState<ActivitySelectionData>({
    after: null,
    before: null,
    maxCount: 50,
    includePrivate: false,
  })

  useEffect(() => {
    (async () => {
      const newStravaActivities: Array<SummaryActivity> = await StravaAPI.get('/athlete/activities');
      const newActivities = new Activities();
      newActivities.add(newStravaActivities, true);
      setActivities(newActivities);
    })();
  }, [selection]);

  const handleSelectionApplyClick = () => {

  }

  const handleSelectionUpdate = (index: number) => {

  }

  const defaultSelection: ActivitySelectionData = {
    maxCount: 50,
    before: null,
    after: null,
    includePrivate: false,
  }

  return (
    <div className="activity-browser">
      <ActivityMap activities={activities} />
      <SidePanel>
        <ActivitySelectionWidget selectionList={[defaultSelection]} onSelectionUpdate={handleSelectionUpdate}/>
        <ActivityFilter activities={activities} />
      </SidePanel>
      <BottomPanel>
        <ActivitySummary activities={activities} />
      </BottomPanel>
    </div>
  )
}

export default ActivityBrowser;
