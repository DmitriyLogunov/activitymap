import React, {useState} from "react";
import MultipleSelectionWidget, {MultipleSelectionWidgetProps, SelectionEditorProps} from "./multiple_selection_widget";

export interface ActivityQuery {
  after: number | null;
  before: number | null;
  maxCount: number;
  includePrivate: boolean;
}

export type ActivityQueryArray = Array<ActivityQuery>;

interface ActivitySelectionWidgetProps {
  queries: ActivityQueryArray;
  newQueryDefaults: ActivityQuery;
  onQueryUpdate: (oldQuery: ActivityQuery, index: number) => void;
}

const ActivitySelectionWidget = (props: ActivitySelectionWidgetProps) => {
  const ItemRenderer = (props: ActivityQuery) => (<>
    Select {props.maxCount} {(!props.before) ? "latest" : ""} {(!props.includePrivate) ? "public" : ""} activities
    {(props.after)
      ? <> from {props.after}</>
      : ""
    }
    {
      (props.before)
        ? <> to {props.before}</>
        : ""
    }
    {(props.includePrivate)
      ? ", including private activities and private zones."
      : ""
    }
  </>);

  const ItemEditor = (props: SelectionEditorProps<ActivityQuery>) => {
    const [state, setState] = useState<ActivityQuery>(props.data);

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

  const multipleSelectionWidgetProps: MultipleSelectionWidgetProps<ActivityQuery> = {
    initialData: props.queries,
    newItemDefaultValues: props.newQueryDefaults,
    onQueryUpdate: props.onQueryUpdate,

    ItemRenderer: ItemRenderer,
    ItemEditor: ItemEditor,
  }

  return (
    <MultipleSelectionWidget
      {...multipleSelectionWidgetProps}
    />
  )
}

export default ActivitySelectionWidget;