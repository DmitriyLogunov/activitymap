import React from "react";

export interface WithEditableElementsProps {
  onElementUpdate: (oldElement: {}, index: number) => void;
}

export default function WithEditableElements<T extends WithEditableElementsProps>(Component: React.ComponentType<T>) {
  return (props: Omit<T, keyof WithEditableElementsProps>) => {
    return(
      <Component {...props as T} />
    )};
}