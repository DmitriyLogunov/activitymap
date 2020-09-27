import React from "react";
import '../styles/SidePanel.scss';

interface SidePanelProps {
  initiallyClosed?: boolean;
  side: "left" | "right";
  children?: React.ReactNode;
}

const SidePanel = (props: SidePanelProps) => {
  const className = "side-panel"
    + (props.initiallyClosed? " closed":" open")
    + " " + (props.side);

  return (<div className={className}>
    {props.children}
  </div>);
}

export default SidePanel;