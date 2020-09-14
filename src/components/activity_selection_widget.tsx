import React, {useEffect, useState} from "react";
import '../styles/activity_selection_form.css';
import ActivityQueryEditorForm from "./activity_query_editor_form";

export interface ActivityQuery {
  after: number | null;
  before: number | null;
  maxCount: number;
  includePrivate: boolean;
}

export type ActivityQueryArray = Array<ActivityQuery>;

interface ActivitySelectionWidgetProps {
  queries: ActivityQueryArray;
  newQuery: ActivityQuery;
  onQueryUpdate: (oldQuery: ActivityQuery, index: number) => void;
}

type EditorState = "view" | "edit" | "add";

interface SelectionItem {
  data: ActivityQuery,
  editorState: EditorState,
}

const ActivitySelectionWidget = (props: ActivitySelectionWidgetProps) => {
  const [state, setState] = useState<Array<SelectionItem>>(Array<SelectionItem>(0));

  useEffect(() => {
    const initialState = Array<SelectionItem>(0);

    props.queries.map((query) => {
      initialState.push({
        data: query,
        editorState: "view"
      })
    })

    setState(initialState);
  }, []);

  const toggleEditor = (index: number, newEditorState: EditorState) => {
    const newState = state.slice();

    newState[index] = {
      ...newState[index],
      editorState: newEditorState,
    };

    setState(newState);
  }

  const handleEditClick = (index: number) => {
    toggleEditor(index, "edit");
  }

  const handleDeleteClick = (index: number) => {
    const newState = state.slice();
    // TODO save this object and provide undo option for a few seconds after deletion
    const deletedSelection = newState.splice(index, 1);

    setState(newState);
  }

  const handleAddSelectionClick = () => {
    const newState = state.slice();

    const newSelectionData: ActivityQuery = {
      maxCount: 1,
      before: null,
      after: null,
      includePrivate: false,
    }

    newState.push({
      data: newSelectionData,
      editorState: "add",
    });

    setState(newState);
  }

  const handleEditorApplyClick = (newSelection: ActivityQuery, index: number) => {
    const oldSelectionData = state[index].data;

    const newState = state.map(
      (selectionItem, i) => i === index? {
        selectionData: newSelection,
        editorState: "view"
      } : selectionItem
    );

    props.onQueryUpdate(oldSelectionData, index);
  }

  const handleEditorCancelClick = (index: number) => {
    const editorState = state[index].editorState;

    if (editorState=="add") {
      const newState = state.slice();
      newState.splice(index, 1);
      setState(newState);
    } else {
      toggleEditor(index, "view");
    }
  }

  return (
    <div className="activity-selection-widget">
      <h3>Select activities:</h3>
      <ul>
      {state.map((selectionItem, index) => {
        return (
          <li key={index}>
            {(selectionItem.editorState == "edit" || selectionItem.editorState == "add")
              ? <ActivityQueryEditorForm
                query={selectionItem.data}
                onApplyClick={(newSelectionData) => handleEditorApplyClick(newSelectionData, index)}
                onCancelClick={() => handleEditorCancelClick(index)}
              />
              : <div className="activity-selection-item">
                  <SelectionDescription selectionData = {selectionItem.data}/>
                  <button className="edit-activity-selection" onClick={() => handleEditClick(index)}>Edit</button>
                  <button className="delete-activity-selection" onClick={() => handleDeleteClick(index)}>Delete</button>
              </div>
            }
          </li>
        )

       })}
      {
        (state.length < 3)
          ? <button className="add-activity-selection" onClick={() => handleAddSelectionClick()}>Add</button>
          : ""
      }
      </ul>
    </div>

  )
}

interface SelectionDescriptionProps {
  selectionData: ActivityQuery
}
const SelectionDescription = (props: SelectionDescriptionProps) => <>
  Select {props.selectionData.maxCount} {(!props.selectionData.before) ? "latest" : ""} {(!props.selectionData.includePrivate) ? "public" : ""} activities
  {(props.selectionData.after)
    ? <> from {props.selectionData.after}</>
    : ""
  }
  {
    (props.selectionData.before)
      ? <> to {props.selectionData.before}</>
      : ""
  }
  {(props.selectionData.includePrivate)
    ? ", including private activities and private zones."
    : ""
  }
  </>;


export default ActivitySelectionWidget