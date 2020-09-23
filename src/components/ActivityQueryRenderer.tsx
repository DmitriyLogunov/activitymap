import React from "react";
import ActivityQuery from "../models/ActivityQuery";
import {RendererProps} from "./MultipleSelectionWidget";

interface ActivityQueryRendererProps extends RendererProps<ActivityQuery> {}

const ActivityQueryRenderer = (props: ActivityQueryRendererProps) => {
  const item = props.itemBeingRendered.get();
  return (<>
    Select {item.maxCount} {(!item.before) ? "latest" : ""} {(!item.includePrivate) ? "public" : ""} activities
    {(item.after)
      ? <> from {item.after}</>
      : ""
    }
    {
      (item.before)
        ? <> to {item.before}</>
        : ""
    }
    {(item.includePrivate)
      ? ", including private activities and private zones."
      : ""
    }
  </>)
};

export default ActivityQueryRenderer;