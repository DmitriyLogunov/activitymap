import React from "react";
import {ItemEditorProps, CollectionEditorAddedProps, ItemRendererProps} from "../components/CollectionEditor";

export default function withCustomItems<T, CombinedHOCProps extends CollectionEditorAddedProps<T>, >(
  Component: React.ComponentType<CombinedHOCProps>,
  Renderer: React.ComponentType<ItemRendererProps<T>>,
  Editor: React.ComponentType<ItemEditorProps<T>>,
) {
  type ReturnedComponentProps = Omit<CombinedHOCProps, keyof CollectionEditorAddedProps<T>>;
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
