import React, {useState} from "react";
import '../styles/WithLoadingIndicator.css'

export interface WithLoadingIndicatorProps {
  showLoadingIndicator: () => void,
  hideLoadingIndicator: () => void,
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
        <Component {...props as CombinedHocProps} showLoadingIndicator={showIndicator} hideLoadingIndicator={hideIndicator} />
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