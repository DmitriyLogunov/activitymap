import React, {useEffect, useState} from "react";
//
export interface DataItem {
}
//
export interface EditorFormProps {
  data: DataItem;
  onApplyClick: (newItem: DataItem) => void;
  onCancelClick: () => void;
}
//
interface EditableArrayWidgetProps {
  dataArray: Array<DataItem>;
  newItem: DataItem;
  editorForm: (props: EditorFormProps) => JSX.Element;
  onItemChange: (oldItem: DataItem, index: number) => void;
}
//
// type EditorState = "view" | "edit" | "add";
//
// interface SelectionItem {
//   selectionData: DataItem,
//   editorState: EditorState,
// }
//
const EditableArrayWidget = (props: EditableArrayWidgetProps) => {
//   const [state, setState] = useState<Array<SelectionItem>>(Array<SelectionItem>(0));
//
//   useEffect(() => {
//     const initialState = Array<SelectionItem>(0);
//
//     props.dataArray.map((data) => {
//       initialState.push({
//         selectionData: data,
//         editorState: "view"
//       })
//     })
//
//     setState(initialState);
//   }, []);
//
//   const toggleEditor = (index: number, newEditorState: EditorState) => {
//     const newState = state.slice();
//
//     newState[index] = {
//       ...newState[index],
//       editorState: newEditorState,
//     };
//
//     setState(newState);
//   }
//
//   const handleEditClick = (index: number) => {
//     toggleEditor(index, "edit");
//   }
//
//   const handleDeleteClick = (index: number) => {
//     const newState = state.slice();
//     // TODO save this object and provide undo option for a few seconds after deletion
//     const deletedSelection = newState.splice(index, 1);
//
//     setState(newState);
//   }
//
//   const handleAddSelectionClick = () => {
//     const newState = state.slice();
//
//     newState.push({
//       selectionData: props.newItem,
//       editorState: "add",
//     });
//
//     setState(newState);
//   }
//
//   const handleEditorApplyClick = (newSelection: ActivitySelectionData, index: number) => {
//     const oldSelectionData = state[index].selectionData;
//
//     const newState = state.map(
//       (selectionItem, i) => i === index? {
//         selectionData: newSelection,
//         editorState: "view"
//       } : selectionItem
//     );
//
//     props.handle(oldSelectionData, index);
//   }
//
//   const handleEditorCancelClick = (index: number) => {
//     const editorState = state[index].editorState;
//
//     if (editorState=="add") {
//       const newState = state.slice();
//       newState.splice(index, 1);
//       setState(newState);
//     } else {
//       toggleEditor(index, "view");
//     }
//   }
//
//   return (
//     <div className="activity-selection-widget">
//       <h3>Select activities:</h3>
//       <ul>
//       {state.map((selectionItem, index) => {
//         return (
//           <li key={index}>
//             {(selectionItem.editorState == "edit" || selectionItem.editorState == "add")
//               ? <ActivitySelectionForm
//                 data={selectionItem.selectionData}
//                 onApplyClick={(newSelectionData) => handleEditorApplyClick(newSelectionData, index)}
//                 onCancelClick={() => handleEditorCancelClick(index)}
//               />
//               : <div className="activity-selection-item">
//                   <SelectionDescription selectionData = {selectionItem.selectionData}/>
//                   <button className="edit-activity-selection" onClick={() => handleEditClick(index)}>Edit</button>
//                   <button className="delete-activity-selection" onClick={() => handleDeleteClick(index)}>Delete</button>
//               </div>
//             }
//           </li>
//         )
//
//        })}
//       {
//         (state.length < 3)
//           ? <button className="add-activity-selection" onClick={() => handleAddSelectionClick()}>Add</button>
//           : ""
//       }
//       </ul>
//     </div>
//
//   )

  return (<></>);
}
//
// interface SelectionDescriptionProps {
//   selectionData: ActivitySelectionData
// }
// const SelectionDescription = (props: SelectionDescriptionProps) => <>
//   Select {(props.selectionData.maxCount)?props.selectionData.maxCount : ""} {(!props.selectionData.before) ? "latest" : ""} {(!props.selectionData.includePrivate) ? "public" : ""} activities
//   {(props.selectionData.after)
//     ? <> starting from {props.selectionData.after}</>
//     : ""
//   }
//   {
//     (props.selectionData.before)
//       ? <> to {props.selectionData.before}</>
//       : ""
//   }
//   {(props.selectionData.includePrivate)
//     ? ", including private activities and private zones."
//     : ""
//   }
//   </>;
//
//
export default EditableArrayWidget