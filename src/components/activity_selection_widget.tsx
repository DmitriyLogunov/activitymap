import React, {useState} from "react";
import '../styles/activity_selection_form.css';
import ActivitySelectionData from "../classes/activity_selection_data";
import ActivitySelectionForm from "./activity_selection_form";

export type ActivitySelectionList = Array<ActivitySelectionData>;

interface ActivitySelectionWidgetProps {
  selectionList: ActivitySelectionList;
  onSelectionUpdate: (index: number) => void;
}

const ActivitySelectionWidget = (props: ActivitySelectionWidgetProps) => {

  const [selectionList, setSelectionList] = useState<ActivitySelectionList>(props.selectionList);
  const [showEditorFor, setShowEditorFor] = useState<number>(-1);

  const handleEditClick = (index: number) => {
    // TODO when clicked EDIT on other activity, process cancel on currently edited activity
    // TODO or (BETTER!) allow editing multiple activities
    setShowEditorFor(index);
  }

  const handleDeleteClick = (index: number) => {
    // TODO save this object and provide undo option for a few seconds after deletion
    const deletedSelection = selectionList.splice(index, 1);
    setSelectionList(selectionList.slice());
    if (showEditorFor>index) {
      setShowEditorFor(showEditorFor - 1);
    }
  }

  // TODO delete item if edit was cancelled
  const handleAddSelectionClick = () => {
    const newSelectionList = selectionList.slice();
    const newSelectionData: ActivitySelectionData = {
      maxCount: 10,
      before: null,
      after: null,
      includePrivate: false,
    }
    newSelectionList.push(newSelectionData);
    setSelectionList(newSelectionList);
    setShowEditorFor(newSelectionList.length - 1);
  }

  const handleEditorApplyClick = (newSelection: ActivitySelectionData, index: number) => {
    // TODO here we can find difference between old and new selection and possibly further up the stack decide that API call isn't needed
    const newSelectionList = selectionList.map(
      (selection, mapIndex) => mapIndex === index? { ...newSelection } : selection)

    setSelectionList(newSelectionList);
    setShowEditorFor(-1);
  }

  const handleEditorCancelClick = (index: number) => {
    setShowEditorFor(-1);
  }


  return (
    <div className="activity-selection-widget">
      <h3>Select activities:</h3>
      <ul>
      {selectionList.map((selection, index) => {
        return (
          <li key={index}>
            {(index === showEditorFor)
              ? <ActivitySelectionForm
                selection={selection}
                onApplyClick={(newSelection) => handleEditorApplyClick(newSelection, index)}
                onCancelClick={() => handleEditorCancelClick(index)}
              />
              : <div className="activity-selection">
                Select {selection.maxCount} {(!selection.before) ? "latest" : ""} {(!selection.includePrivate) ? "public" : ""} activities
                {(selection.after)
                  ? <> from {selection.after}</>
                  : ""
                }
                {
                  (selection.before)
                    ? <> to {selection.before}</>
                    : ""
                }
                {(selection.includePrivate)
                  ? ", including private activities and private zones."
                  : ""
                }
                <button className="edit-activity-selection" onClick={() => handleEditClick(index)}>Edit</button>
                <button className="delete-activity-selection" onClick={() => handleDeleteClick(index)}>Delete</button>
              </div>
            }
          </li>
        )

       })}
      {
        (selectionList.length < 3 && showEditorFor==-1)
          ? <button className="add-activity-selection" onClick={() => handleAddSelectionClick()}>Add</button>
          : ""
      }
      </ul>
    </div>

  )
}

export default ActivitySelectionWidget