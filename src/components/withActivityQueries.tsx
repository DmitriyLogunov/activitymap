import React from "react";
import {
  MultipleSelectionCombinedProps,
  MultipleSelectionCustomRendererProps,
  withCustomItems
} from "./multiple_selection_widget";
import {ActivityQuery} from "../models/ActivityQuery";
import ActivityQueryRenderer from "./ActivityQueryRenderer";
import ActivityQueryEditor from "./ActivityQueryEditor";

export interface WithActivityQueriesProps extends MultipleSelectionCustomRendererProps<ActivityQuery> {}

export default function withActivityQueries(
  Component: React.ComponentType<MultipleSelectionCombinedProps<ActivityQuery>>
) {
  return withCustomItems<ActivityQuery, MultipleSelectionCombinedProps<ActivityQuery>>(Component, ActivityQueryRenderer, ActivityQueryEditor);
}
