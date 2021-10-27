import { useSelector } from "react-redux";
import AutocompleteAssignment from "./AutocompleteAssignment";

export default function AssignStatement() {
    const activeSelection = useSelector(state=>state.display.activeSelection);
    let receiverDisplayName;

    if (activeSelection.type==="myData"||activeSelection.type==="assistant") {
        receiverDisplayName = "";
    } else if (activeSelection.type==="type") {
        receiverDisplayName = activeSelection.selection.title_plural
    } else {
        receiverDisplayName = activeSelection.selection.name;
    }

    return (
        <>
        <AutocompleteAssignment />
        {`to ${receiverDisplayName}`}
        </>
    )
}