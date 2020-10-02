import React, {useState} from "react";
import '../styles/ActivityBrowser.css';
import ActivityMap from "./ActivityMap";
import ActivitySummary from "./ActivitySummary";
import SidePanel from "./SidePanel";
import BottomPanel from "./BottomPanel";
import ActivityList from "./ActivityList";
import withActivityFilters from "../hoc/withActivityFilters";
import ActivityFilter from "../models/ActivityFilter";
import ActivityQuery, {ActivityQueryData} from "../models/ActivityQuery";
import MultipleSelectionWidget from "./MultipleSelectionWidget";
import withActivityQueries from "../hoc/withActivityQueries";
import FilteredActivities from "../classes/FilteredActivities";
import ActivityLoader from "./ActivityLoader";
import ActivityCSV from "./ActivityCSV";
import withLoadingIndicator, {WithLoadingIndicatorProps} from "../hoc/withLoadingIndicator";


interface ActivityBrowserState {
  activities?: FilteredActivities;
  queries: Array<ActivityQuery>;
  filters: Array<ActivityFilter>;
}

interface ActivityBrowserProps extends WithLoadingIndicatorProps {
  includePrivateActivities: boolean;
  showAsCSV?: boolean;
}

const ActivityBrowser = withLoadingIndicator((props: ActivityBrowserProps) => {
  const queryDefaults: ActivityQueryData = {
    selector: {
      type: "latest",
      count: 30,
    },
    includePrivate: props.includePrivateActivities,
  };

  const [state, setState] = useState<ActivityBrowserState>({
    queries: [new ActivityQuery(queryDefaults)],
    filters: [],
  });

  const handleQueryUpdate = (newQueryData: ActivityQuery, index: number) => {
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

  const handleActivityListUpdate = (newActivities: FilteredActivities) => {
    setState({
      ...state,
      activities: newActivities
    });
  }

  const handleActivityFilterUpdate = (item: ActivityFilter, index: number) => {
  }

  const ActivityQueriesWidget = withActivityQueries(MultipleSelectionWidget);
  const ActivityFiltersWidget = withActivityFilters(MultipleSelectionWidget);

  const filteredActivities = state.activities? state.activities : new FilteredActivities();

  return (
    <div className="activity-browser">
      <ActivityLoader queries={state.queries} onActivitiesUpdate={handleActivityListUpdate} />
      {(props.showAsCSV)
        ? <ActivityCSV filteredActivities={filteredActivities} />
        : <ActivityMap filteredActivities={filteredActivities} />
      }
      <SidePanel side={"left"}>
        <h3>Select activities:</h3>
        <ActivityQueriesWidget itemArray={state.queries} newItem={new ActivityQuery(queryDefaults)}
                               onItemUpdate={handleQueryUpdate} onItemAdd={handleQueryAdd}
                               onItemDelete={handleQueryDelete} maxItemCount={3}/>
        <h3>Apply filters:</h3>
        <ActivityFiltersWidget itemArray={new Array<ActivityFilter>()}
                               newItem={new ActivityFilter({filterType: "keyWord", filterRule: "foo"})}
                               onItemUpdate={handleActivityFilterUpdate}/>
        <h3>Activity summary:</h3>
        <ActivitySummary filteredActivities={filteredActivities}/>
      </SidePanel>
      <SidePanel side={"right"}>
        <h3>Activity list:</h3>
        <ActivityList filteredActivities={filteredActivities} />
      </SidePanel>
      <BottomPanel>

      </BottomPanel>
    </div>
  )
});

export default ActivityBrowser;
