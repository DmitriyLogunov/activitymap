import React from "react";
import Activities from "../classes/activities";
import withEditableElements, {WithEditableElementsProps} from "./with_editable_elements";

interface ActivityFilterWidgetProps extends WithEditableElementsProps {
  activities: Activities;
}

const ActivityFilterWidget = withEditableElements((props: ActivityFilterWidgetProps) => {
  return (<div className="activity-filter">
    <h3>Apply filters:</h3>

    {/*<EditableArray>*/}
    {/*  <View>*/}

    {/*  </View>*/}
    {/*  <Editor>*/}

    {/*  </Editor>*/}
    {/*</EditableArray>*/}
  </div>);
});

export default ActivityFilterWidget;