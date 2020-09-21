import React, {useState} from "react";
import {ActivityQuery} from "../models/ActivityQuery";
import {SelectionEditorProps} from "./multiple_selection_widget";

const ActivityqueryEditor = (props: SelectionEditorProps<ActivityQuery>) => {
  const [state, setState] = useState<ActivityQuery>(props.itemBeingEdited);

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      maxCount: parseInt(event.target.value)
    });
  }

  return (<div className="activity-selector">
      <form>
        <label>
          Activity range:
        </label>
        <br/>

        <label>
          Max activities:
          <input
            type="range"
            name="count"
            min={1}
            max={100}
            value={state.maxCount}
            onChange={handleCountChange}
          />
          {state.maxCount}
        </label>

        <br/>

        <label>Date range: {}</label>

        <br/>

        <label>Include private activities</label>

        <br/>

        <button onClick={() => props.onApplyClick(state)}>Apply</button>
        <button onClick={() => props.onCancelClick()}>Cancel</button>
      </form>
    </div>
  )
};

export default ActivityqueryEditor;