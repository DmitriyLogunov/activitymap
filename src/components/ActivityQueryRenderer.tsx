import React from "react";
import ActivityQuery from "../models/ActivityQuery";
import {RendererProps} from "./MultipleSelectionWidget";

interface ActivityQueryRendererProps extends RendererProps<ActivityQuery> {}

const ActivityQueryRenderer = (props: ActivityQueryRendererProps) => {
  const item = props.itemBeingRendered.get();
  const selector = item.selector;

  const selectorText = (()=>{
    switch (selector.type) {
      case "latest":
        return <>Latest {selector.count} {(!item.includePrivate) ? "public" : ""} activities</>
      case "dateRange":
        return <>From {selector.startDate} to {selector.endDate}</>
      case "startDate":
        return <>Starting from {selector.startDate} until now"</>
    }

  })()
  return (<>
    {selectorText}
    {(item.includePrivate)
      ? ", including private activities and private zones."
      : ""
    }
  </>)
};

export default ActivityQueryRenderer;