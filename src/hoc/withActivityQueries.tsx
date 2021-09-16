import React from "react";
import {
  CollectionEditorCombinedProps,
  ItemRendererProps
} from "../components/CollectionEditor";
import ActivityQuery from "../models/ActivityQuery";
import withCustomItems from "./withCustomItems";
import ActivityQueryRenderer from "../components/ActivityQueryRenderer";
import ActivityQueryEditor from "../components/ActivityQueryEditor";

export interface WithActivityQueriesProps extends ItemRendererProps<ActivityQuery> {}

export default function withActivityQueries(
  Component: React.ComponentType<CollectionEditorCombinedProps<ActivityQuery>>
) {
  return withCustomItems<ActivityQuery, CollectionEditorCombinedProps<ActivityQuery>>(Component, ActivityQueryRenderer, ActivityQueryEditor);
}
