import React, {useEffect, useState} from "react";
import '../styles/MultipleSelectionWidget.scss';

export interface MultipleSelectionCustomRendererProps<T> {
  ItemRenderer: React.ComponentType<RendererProps<T>>;
  ItemEditor: React.ComponentType<EditorProps<T>>;
}

export interface MultipleSelectionBaseProps<T> {
  itemArray: Array<T>;
  newItem?: T;
  onItemAdd?: (newItemValue: T) => void;
  onItemUpdate?: (newItemValue: T, index: number) => void;
  onItemDelete?: (index: number) => void;
}

export interface BaseSelectionItem {
  key: string;
}

export interface RendererProps<T> {
  itemBeingRendered: T,
}

export interface EditorProps<T> {
  itemBeingEdited: T,
  onEditApply: (newSelection: T) => void;
  onEditCancel: () => void;
}

export interface MultipleSelectionCombinedProps<T> extends MultipleSelectionBaseProps<T>, MultipleSelectionCustomRendererProps<T> {
}

interface MultipleSelectionState<T> {
  editorStates: Array<EditorState>,
  newItem?: T,
  newItemEditorState?: EditorState,
}

type EditorState = "view" | "edit" | "updating" | "deleting" | "hidden";

function MultipleSelectionWidget<T extends BaseSelectionItem>(props: MultipleSelectionCombinedProps<T>) {
  const [state, setState] = useState<MultipleSelectionState<T>>({
    editorStates: Array(props.itemArray.length).fill("view"),
    newItem: props.newItem,
    newItemEditorState: "hidden",
  });

  const setEditorState = (newEditorState: EditorState, index: number) => {
    const newEditorStates = state.editorStates.slice();
    newEditorStates[index] = newEditorState;

    setState({
      ...state,
      editorStates: newEditorStates,
    });
  }

  const handleEditClick = (index: number) => {
    setEditorState("edit", index);
  }

  const handleDeleteClick = (index: number) => {
    setEditorState("deleting", index);

    if (props.onItemDelete) {
      props.onItemDelete(index);
    }
  }

  const handleAddClick = () => {
    setState({
      ...state,
      newItemEditorState: "edit"
    })
  }

  const handleEditorApplyClick = (newData: T, index: number) => {
    setEditorState("updating", index);

    if (props.onItemUpdate) {
      props.onItemUpdate(newData, index);
    }
  }

  const handleEditorCancelClick = (index: number) => {
    if (index===state.editorStates.length) {
      // means that item in question is
    }
    const newEditorStates = state.editorStates.slice();
    newEditorStates[index] = "view";

    const editorState = state.editorStates[index];

    setEditorState("view", index);
  }

  const handleAddNewCancelClick = () => {
    setState({
      ...state,
      newItemEditorState: "hidden",
    })
  }

  const  handleAddNewApplyClick = (newData: T) => {
    setState({
      ...state,
      newItemEditorState: "updating",
    })

    if (props.onItemAdd && state.newItem) {
      props.onItemAdd(newData);
    }
  }

  const ItemRenderer = props.ItemRenderer;
  const ItemEditor = props.ItemEditor;

  const renderedItems = props.itemArray.map((item, index) => {
    const editorState = state.editorStates[index];
    const renderedItem = (() => {
      switch(editorState) {
        case "view":
          return <>
            <div className="item-text">
            <ItemRenderer
              itemBeingRendered = {item}
            />
            </div>
            <div className="item-controls">
              <button className="item-editbutton" onClick={() => handleEditClick(index)}>Edit</button>
              <button className="item-deletebutton" onClick={() => handleDeleteClick(index)}>Delete</button>
            </div>
          </>
        case "edit":
          return <div className="item-editor"><ItemEditor
            itemBeingEdited={item}
            onEditApply={(newSelectionData) => handleEditorApplyClick(newSelectionData, index)}
            onEditCancel={() => handleEditorCancelClick(index)}
          /></div>
        case "deleting":
          return <div>Deleting...</div>
        case "updating":
          return <div>Updating...</div>
        case "hidden":
        default:
          return <></>
      }
    })();

    return <li key={item.key} className={"selection-item"}>
      {renderedItem}
    </li>;
  })

  const renderedExtraItem = (state.newItem)
    ? <li key={state.newItem.key} className={"selection-item"}>{
      (() => {
        switch (state.newItemEditorState) {
          case "hidden":
            return <button className="item-addbutton" onClick={() => handleAddClick()}>Add</button>
          case "updating":
            return <div>Updating...</div>
          case "edit":
            return <ItemEditor
              itemBeingEdited={state.newItem}
              onEditApply={(newSelectionData) => handleAddNewApplyClick(newSelectionData)}
              onEditCancel={() => handleAddNewCancelClick()}
            />
          default:
            return <></>
        }
      })()
    }</li>
    : <></>;
  
  return (
    <div className="selection-widget">
      <ul className={"selection-list"}>
        {renderedItems}
        {renderedExtraItem}
      </ul>
    </div>
  )
}

export default MultipleSelectionWidget