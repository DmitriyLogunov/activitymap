import React, {useState} from "react";
import {MultipleSelectionInjectedProps} from "./multiple_selection_widget";
import {ActivityQuery} from "../models/ActivityQuery";
import ActivityQueryRenderer from "./ActivityQueryRenderer";
import ActivityQueryEditor from "./ActivityQueryEditor";

export interface WithActivityQueriesProps extends MultipleSelectionInjectedProps<ActivityQuery> {}

export default function withActivityQueries<CombinedHOCProps extends WithActivityQueriesProps>(Component: React.ComponentType<CombinedHOCProps>) {
  type ReturnedComponentProps = Omit<CombinedHOCProps, keyof WithActivityQueriesProps>;
  return (props: ReturnedComponentProps) => {
    return (
      <Component
        {...props as CombinedHOCProps}

        ItemRenderer={ActivityQueryRenderer}
        ItemEditor={ActivityQueryEditor}
      />
    )
  };
}

