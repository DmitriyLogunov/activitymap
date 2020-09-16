import React, {useEffect, useState} from "react";
import '../styles/activity_selection_form.css';

export type DataArray<T> = Array<T>;

type EditorState = "view" | "edit" | "add";

interface SelectionItem<T> {
  data: T,
  editorState: EditorState,
}

export interface SelectionEditorProps<T> {
  data: T,
  onApplyClick: (newSelection: T) => void;
  onCancelClick: () => void;
}

export interface MultipleSelectionWidgetProps<T> {
  data: DataArray<T>;
  newItemDefaultValue: T;

  onQueryUpdate: (oldQuery: T, index: number) => void;

  ItemRenderer: React.ComponentType<T>;
  ItemEditor: React.ComponentType<SelectionEditorProps<T>>
}

function MultipleSelectionWidget<T>(props: MultipleSelectionWidgetProps<T>) {
  const [state, setState] = useState<Array<SelectionItem<T>>>(Array<SelectionItem<T>>(0));

  useEffect(() => {
    const initialState = Array<SelectionItem<T>>(0);

    props.data.map((dataItem) => {
      initialState.push({
        data: dataItem,
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

    newState.push({
      data: props.newItemDefaultValue,
      editorState: "add",
    });

    setState(newState);
  }

  const handleEditorApplyClick = (newData: T, index: number) => {
    const oldSelectionData = state[index].data;

    const newState = state.map(
      (selectionItem, i) => i === index? {
        selectionData: newData,
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

  const ItemRenderer = props.ItemRenderer;
  const ItemEditor = props.ItemEditor;

  return (
    <div className="activity-selection-widget">
      <ul>
        {state.map((selectionItem, index) => {
          return (
            <li key={index}>
              {(selectionItem.editorState == "edit" || selectionItem.editorState == "add")
                ? <ItemEditor
                  data={selectionItem.data}
                  onApplyClick={(newSelectionData) => handleEditorApplyClick(newSelectionData, index)}
                  onCancelClick={() => handleEditorCancelClick(index)}
                />
                : <div className="activity-selection-item">
                  <ItemRenderer {...selectionItem.data} />
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

export default MultipleSelectionWidget