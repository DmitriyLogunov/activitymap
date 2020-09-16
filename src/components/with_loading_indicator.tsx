import React, {useState} from "react";

export interface WithLoadingIndicatorProps {
  showIndicator: () => void,
  hideIndicator: () => void,
}

export default function withLoadingIndicator<CombinedHocProps extends WithLoadingIndicatorProps>(Component: React.ComponentType<CombinedHocProps>) {
  type ReturnedComponentProps = Omit<CombinedHocProps, keyof WithLoadingIndicatorProps>;
  return (props: ReturnedComponentProps) => {
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
        <Component {...props as CombinedHocProps} showIndicator={showIndicator} hideIndicator={hideIndicator} />
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