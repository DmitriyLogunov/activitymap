import React, {useState} from "react";
import MultipleSelectionWidget, { MultipleSelectionCombinedProps } from "./multiple_selection_widget";
import {ActivityQuery} from "../models/ActivityQuery";
import withActivityQueries from "./withActivityQueries";

interface ActivityQueriesWidgetProps extends MultipleSelectionCombinedProps<ActivityQuery> {
};

const ActivityQueriesWidget = withActivityQueries((props: ActivityQueriesWidgetProps) =>
  (
    <MultipleSelectionWidget {...props}/>
  )
);


export default ActivityQueriesWidget;