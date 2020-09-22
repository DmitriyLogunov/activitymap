import React from "react";
import {EditorProps, MultipleSelectionCustomRendererProps, RendererProps} from "../components/MultipleSelectionWidget";

export default function withCustomItems<T, CombinedHOCProps extends MultipleSelectionCustomRendererProps<T>, >(
  Component: React.ComponentType<CombinedHOCProps>,
  Renderer: React.ComponentType<RendererProps<T>>,
  Editor: React.ComponentType<EditorProps<T>>,
) {
  type ReturnedComponentProps = Omit<CombinedHOCProps, keyof MultipleSelectionCustomRendererProps<T>>;
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
