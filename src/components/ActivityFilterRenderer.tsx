import React from "react";
import ActivityFilter from "../models/ActivityFilter";
import {ItemRendererProps} from "./CollectionEditor";

interface ActivityFilterRendererProps extends ItemRendererProps<ActivityFilter> {}

const ActivityFilterRenderer = (props: ActivityFilterRendererProps) => {
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