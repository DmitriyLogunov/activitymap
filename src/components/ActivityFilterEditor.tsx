import {EditorProps} from "./MultipleSelectionWidget";
import React, {useState} from "react";
import ActivityFilter from "../models/ActivityFilter";

interface ActivityFilterEditorState {
  filter: ActivityFilter,
}

interface ActivityFilterEditorProps extends EditorProps<ActivityFilter> {}

const ActivityFilterEditor = (props: ActivityFilterEditorProps) => {
  const [state, setState] = useState<ActivityFilterEditorState>({
    filter: new ActivityFilter(props.itemBeingEdited.get()),
  });

  const filterValueInput = (() => {
    switch (state.filter.get().filterType) {
      case "keyValuePair":
        return <div>Select key-value filter</div>;
      case "keyWord":
        return <div>Type keyword filter</div>;
      default:
        return "";
    }
  })();

  return (
    <div className="activity-filter">
      <form>
        <label>
          Filter by:
          <select
            name={"filterType"}
          >
            <option value={"keyWord"}>Keyword</option>
            {/* TODO list all activity fields here, most often used being at the top */}
          </select>
        </label>
        <br/>

        <label>
          Select:
          {filterValueInput}
        </label>

        <button onClick={() => props.onApplyClick(state.filter)}>Apply</button>
        <button onClick={() => props.onCancelClick()}>Cancel</button>
      </form>
    </div>
  );
};

export default ActivityFilterEditor;