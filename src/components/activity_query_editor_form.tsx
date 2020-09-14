import React, {useState} from "react";
import '../styles/activity_selection_form.css';
import {ActivityQuery} from "./activity_selection_widget";

interface ActivityQueryEditorFormProps {
  query: ActivityQuery;
  onApplyClick: (newSelection: ActivityQuery) => void;
  onCancelClick: () => void;
}

const ActivityQueryEditorForm = (props: ActivityQueryEditorFormProps) => {
  const [state, setState] = useState<ActivityQuery>(props.query);

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
  </div>);
}

export default ActivityQueryEditorForm;