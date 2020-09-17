import React, {useState} from "react";
import {
  SelectionEditorProps,
  MultipleSelectionInjectedProps
} from "./multiple_selection_widget";

export interface ActivityQuery {
  after: number | null;
  before: number | null;
  maxCount: number;
  includePrivate: boolean;
}

export interface WithActivityQueriesProps extends MultipleSelectionInjectedProps<ActivityQuery> {
}

export default function withActivityQueries<CombinedHOCProps extends WithActivityQueriesProps>(Component: React.ComponentType<CombinedHOCProps>) {
  type ReturnedComponentProps = Omit<CombinedHOCProps, keyof WithActivityQueriesProps>;
  return (props: ReturnedComponentProps) => {
    return (
      <Component
        {...props as CombinedHOCProps}

        ItemRenderer={ItemRenderer}
        ItemEditor={ItemEditor}
      />
    )
  };
}

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