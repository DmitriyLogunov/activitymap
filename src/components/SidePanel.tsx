import React from "react";
import '../styles/SidePanel.css';

interface SidePanelProps {
  initiallyClosed?: boolean;
  children?: React.ReactNode;
}

const SidePanel = (props: SidePanelProps) => {
  const className = "side-panel"
    + (props.initiallyClosed? " closed":" open");

  return (<div className={className}>
    {props.children}
  </div>);
}

export default SidePanel;