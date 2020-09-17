import React, {useState} from "react";
import MultipleSelectionWidget, { MultipleSelectionCombinedProps } from "./multiple_selection_widget";
import withActivityQueries, {ActivityQuery, WithActivityQueriesProps} from "./with_activity_queries";

interface ActivityQueriesWidgetProps extends MultipleSelectionCombinedProps<ActivityQuery> {
};

const ActivityQueriesWidget = withActivityQueries((props: ActivityQueriesWidgetProps) =>
  (
    <MultipleSelectionWidget {...props}/>
  )
);


export default ActivityQueriesWidget;