import React from "react";
import {ActivityQuery} from "../models/ActivityQuery";

const ActivityQueryRenderer = (props: ActivityQuery) => (<>
  Select {props.maxCount} {(!props.before) ? "latest" : ""} {(!props.includePrivate) ? "public" : ""} activities
  {(props.after)
    ? <> from {props.after}</>
    : ""
  }
  {
    (props.before)
      ? <> to {props.before}</>
      : ""
  }
  {(props.includePrivate)
    ? ", including private activities and private zones."
    : ""
  }
</>);

export default ActivityQueryRenderer;