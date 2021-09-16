import {CollectionEditorCombinedProps} from "../components/CollectionEditor";
import React from "react";
import ActivityFilter from "../models/ActivityFilter";
import ActivityFilterRenderer from "../components/ActivityFilterRenderer";
import ActivityFilterEditor from "../components/ActivityFilterEditor";
import withCustomItems from "./withCustomItems";

export default function withActivityFilters(
  Component: React.ComponentType<CollectionEditorCombinedProps<ActivityFilter>>
) {
  return withCustomItems<ActivityFilter, CollectionEditorCombinedProps<ActivityFilter>>(Component, ActivityFilterRenderer, ActivityFilterEditor);
}

