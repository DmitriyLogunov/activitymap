import {MultipleSelectionCombinedProps} from "../components/MultipleSelectionWidget";
import React from "react";
import ActivityFilter from "../models/ActivityFilter";
import ActivityFilterRenderer from "../components/ActivityFilterRenderer";
import ActivityFilterEditor from "../components/ActivityFilterEditor";
import withCustomItems from "./withCustomItems";

export default function withActivityFilters(
  Component: React.ComponentType<MultipleSelectionCombinedProps<ActivityFilter>>
) {
  return withCustomItems<ActivityFilter, MultipleSelectionCombinedProps<ActivityFilter>>(Component, ActivityFilterRenderer, ActivityFilterEditor);
}

