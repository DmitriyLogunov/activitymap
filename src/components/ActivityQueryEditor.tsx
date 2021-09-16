import React, {useState} from "react";
import ActivityQuery, {ActivitySelector} from "../models/ActivityQuery";
import {ItemEditorProps} from "./CollectionEditor";
import ReactDatePicker from "react-datepicker";

interface ActivityQueryEditorState {
  type: string;
  count?: number;
  startDate?: Date;
  endDate?: Date;
}

type ActivityQueryEditorProps = ItemEditorProps<ActivityQuery>;

type ReactDatePickerDate = Date | [Date | null, Date | null] | /* for selectsRange */ null;

const ActivityQueryEditor = (props: ActivityQueryEditorProps) => {
  const itemBeingEdited = props.allItems[props.indexOfItemBeingEdited];
  const selector = itemBeingEdited.get().selector;
  const [state, setState] = useState<ActivityQueryEditorState>({
    ...selector
  });

  const handleTypeChange = (newType: string) => {
    setState({
      ...state,
      type: newType,
    });
  }

  const handleCountChange = (newCount: number): void => {
    setState({
      ...state,
      type: "latest",
      count: newCount,
    });
  }

  const extractDate = (date: ReactDatePickerDate): Date | null => {
    if (date instanceof Array) {
      return date[0];
    } else {
      return date;
    }
  }

  const handleStartDateChange = (newStartDate: ReactDatePickerDate): void => {
    const newStartDateValue = extractDate(newStartDate);

    if (newStartDateValue) {
      setState({
        ...state,
        type: "dateRange",
        startDate: newStartDateValue,
      })
    }
  }

  const handleEndDateChange = (newEndDate: ReactDatePickerDate): void => {
    const newEndDateValue = extractDate(newEndDate);

    if (newEndDateValue) {
      setState({
        ...state,
        type: "dateRange",
        endDate: newEndDateValue,
      })
    }
  }

  const getSelector = (): ActivitySelector | null => {
    switch (state.type) {
      case "latest":
        if (state.count) {
          return {
            type: "latest",
            count: state.count,
          }
        } else {
          return null;
        }
      case "dateRange":
        if (state.startDate && state.endDate) {
          return {
            type: "dateRange",
            startDate: state.startDate,
            endDate: state.endDate,
          }
        } else {
          return null;
        }
      case "startDate":
        if (state.startDate) {
          return {
            type: "startDate",
            startDate: state.startDate,
          }
        } else {
          return null;
        }
      default:
        return null;
    }
  }

  const handleApplyClick = () => {
    const selector = getSelector();
    if (selector) {
      const newActivityQuery = new ActivityQuery({
        selector: selector,
        includePrivate: itemBeingEdited.get().includePrivate,
      });

      props.onEditApply(newActivityQuery);
    }
  }

  const selectorSpecificFormFields = (()=>{
    switch (state.type) {
      case "latest":
        return <label>
          Max activities:
          <input
            type="range"
            name="count"
            min={1}
            max={100}
            value={state.count}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCountChange(parseInt(event.target.value))}
          />
          <input
            type="text"
            name="count-text"
            value={state.count}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCountChange(parseInt(event.target.value))}
          >
          </input>
        </label>
      case "dateRange":
        return <>
          <label>
            From:
            <ReactDatePicker selected={state.startDate} onChange={date => handleStartDateChange(date)} selectsStart />
          </label>
          <label>
            To:
            <ReactDatePicker selected={state.endDate} onChange={date => handleEndDateChange(date)} selectsEnd />
          </label>
        </>
      default:
        return <></>
    }
  })();

  return (<div className="activity-selector">
      <form>
        <label>
          Select by:
          <select name="type" onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleTypeChange(event.target.value)}>
            <option value={"latest"}>Latest activities</option>
            {/*<option value={"startDate"}>Latest, from selected date</option>*/}
            <option value={"dateRange"}>Date range</option>
          </select>
        </label>
        <br/>

        {selectorSpecificFormFields}

        <label>Date range: {}</label>

        <button onClick={() => handleApplyClick()}>Apply</button>
        <button onClick={() => props.onEditCancel()}>Cancel</button>
      </form>
    </div>
  )
};

export default ActivityQueryEditor;