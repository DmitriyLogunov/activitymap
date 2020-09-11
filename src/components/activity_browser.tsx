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
import ActivitySelection from "../classes/activity_selection";
import BottomPanel from "./bottom_panel";

interface ActivityBrowserProps {
}

const ActivityBrowser = (props: ActivityBrowserProps) => {
  const [activities, setActivities] = useState(new Activities());
  const [selection, setSelection] = useState<ActivitySelection>({
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

  const handleSelectionApplyClick = (): void => {

  }

  return (
    <div className="activity-browser">
      <ActivityMap activities={activities} />
      <SidePanel>
        <ActivitySelectionForm selection={selection} onApplyClick={handleSelectionApplyClick} />
        <ActivityFilter activities={activities} />
      </SidePanel>
      <BottomPanel>
        <ActivitySummary activities={activities} />
      </BottomPanel>
    </div>
  )
}

export default ActivityBrowser;
