import React from "react";
import '../styles/BottomPanel.css';

interface BottomPanelProps {
  children?: React.ReactNode;
}

const BottomPanel = (props: BottomPanelProps) => {
  const className = "bottom-panel";

  return (<div className={className}>
    {props.children}
  </div>);
}

export default BottomPanel;