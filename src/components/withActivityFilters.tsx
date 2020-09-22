import {
  MultipleSelectionCombinedProps,
  EditorProps,
  RendererProps,
  withCustomItems
} from "./multiple_selection_widget";
import React from "react";
import ActivityFilter from "../models/ActivityFilter";
import ActivityFilterRenderer from "./ActivityFilterRenderer";
import ActivityFilterEditor from "./ActivityFilterEditor";

export default function withActivityFilters(
  Component: React.ComponentType<MultipleSelectionCombinedProps<ActivityFilter>>
) {
  return withCustomItems<ActivityFilter, MultipleSelectionCombinedProps<ActivityFilter>>(Component, ActivityFilterRenderer, ActivityFilterEditor);
}

