import React, {useState} from "react";
import '../styles/activity_selector.css';
import ActivitySelection from "../classes/activity_selection";

interface ActivitySelectionFormProps {
  selection: ActivitySelection;
  onApplyClick: () => void;
}

const ActivitySelectionForm = (props: ActivitySelectionFormProps) => {

  const [maxCount, setMaxCount] = useState<number>(props.selection.maxCount);
  const [after, setAfter] =  useState<number | null>(props.selection.after);
  const [before, setBefore] =  useState<number | null>(props.selection.before);
  const [includePrivate, setIncludePrivate] =  useState<boolean>(props.selection.includePrivate);

  const [selection, setSelection] = useState<ActivitySelection>(props.selection);

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMaxCount(parseInt(event.target.value));
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
          value={maxCount}
          onChange={handleCountChange}
        />
        {maxCount}
      </label>

      <br/>

      <label>Date range: {}</label>

      <br/>

      <label>Include private activities</label>

      <br/>

      <input type="submit" value="Reload" onClick={() => props.onApplyClick()} />
    </form>
  </div>);
}

export default ActivitySelectionForm;