import React, {useState} from "react";

export interface WithLoadingIndicatorProps {
  showIndicator: () => void,
  hideIndicator: () => void,
}

export default function withLoadingIndicator<T extends WithLoadingIndicatorProps>(Component: React.ComponentType<T>) {
  return (props: Omit<T, keyof WithLoadingIndicatorProps>) => {
    const [isVisible, setIsVisible] = useState(false);

    const showIndicator = () => {
      setIsVisible(true);
    }

    const hideIndicator = () => {
      setIsVisible(false);
    }

    return (
    <>
      <div className="component-container">
        <Component {...props as T} showIndicator={showIndicator} hideIndicator={hideIndicator} />
      </div>
      {(isVisible)
        ?
        <div className="loading-overlay">
          <div className="loader-1" />
        </div>
        : ""
      }
    </>
  )};
}