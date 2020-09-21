import React from "react";
import ActivityFilter from "../models/ActivityFilter";
import {SelectionRendererProps} from "./multiple_selection_widget";

interface ActivityFilterRendererProps extends SelectionRendererProps<ActivityFilter> {}

const ActivityFilterRenderer = (props: SelectionRendererProps<ActivityFilter>) => {
  return (<div>A</div>);
  // const filter = props.itemBeingRendered.get();
  // switch (filter.FilterType) {
  //   case "keyValuePair":
  //     const keyPair = filter.FilterRule;
  //     return <div>Where {keyPair.key}</div>;
  //   case "keyWord":
  //     const keyWord = filter.FilterRule;
  //     return <div>Containing {keyWord}</div>;
  //   default:
  //     return "";
  // }
}

export default ActivityFilterRenderer;