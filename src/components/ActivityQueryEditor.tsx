import React, {useState} from "react";
import ActivityQuery from "../models/ActivityQuery";
import {EditorProps} from "./MultipleSelectionWidget";

interface ActivityQueryEditorState {
  item: ActivityQuery;
}

const ActivityQueryEditor = (props: EditorProps<ActivityQuery>) => {
  const [state, setState] = useState<ActivityQueryEditorState>({
    item: props.itemBeingEdited,
  });

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newMaxCount = parseInt(event.target.value);

    const existingItemFields = state.item.get();
    const newItem = new ActivityQuery({
      ...existingItemFields,
      maxCount: newMaxCount,
    });

    setState({
      ...state,
      item: newItem
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
            value={state.item.get().maxCount}
            onChange={handleCountChange}
          />
          {state.item.get().maxCount}
        </label>

        <br/>

        <label>Date range: {}</label>

        <br/>

        <label>Include private activities</label>

        <br/>

        <button onClick={() => props.onApplyClick(state.item)}>Apply</button>
        <button onClick={() => props.onCancelClick()}>Cancel</button>
      </form>
    </div>
  )
};

export default ActivityQueryEditor;