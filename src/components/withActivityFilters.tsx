import {
  MultipleSelectionInjectedProps,
  SelectionEditorProps,
  SelectionRendererProps
} from "./multiple_selection_widget";
import React from "react";
import ActivityFilter from "../models/ActivityFilter";

export interface WithActivityFiltersProps extends MultipleSelectionInjectedProps<ActivityFilter> {}

export default function withActivityFilters<CombinedHOCProps extends WithActivityFiltersProps, T>(
  Component: React.ComponentType<CombinedHOCProps>,
  Renderer: React.ComponentType<SelectionRendererProps<T>>,
  Editor: React.ComponentType<SelectionEditorProps<T>>,
) {
  type ReturnedComponentProps = Omit<CombinedHOCProps, keyof WithActivityFiltersProps>;
  return (props: ReturnedComponentProps) => {
    return (
      <Component
        {...props as CombinedHOCProps}

        ItemRenderer={Renderer}
        ItemEditor={Editor}
      />
    )
  };
}
