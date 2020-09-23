import React from "react";
import {
  MultipleSelectionCombinedProps,
  MultipleSelectionCustomRendererProps
} from "../components/MultipleSelectionWidget";
import ActivityQuery from "../models/ActivityQuery";
import withCustomItems from "./withCustomItems";
import ActivityQueryRenderer from "../components/ActivityQueryRenderer";
import ActivityQueryEditor from "../components/ActivityQueryEditor";

export interface WithActivityQueriesProps extends MultipleSelectionCustomRendererProps<ActivityQuery> {}

export default function withActivityQueries(
  Component: React.ComponentType<MultipleSelectionCombinedProps<ActivityQuery>>
) {
  return withCustomItems<ActivityQuery, MultipleSelectionCombinedProps<ActivityQuery>>(Component, ActivityQueryRenderer, ActivityQueryEditor);
}
