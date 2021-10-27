import { createSlice } from "@reduxjs/toolkit";

export const assistantPathObject = {
    id: "assistant",
    title_singular: "Assistant",
    title_plural: "Assistant"
}

export const myDataPathObject = {
    id: "myData",
    title_singular: "My Data",
    title_plural: "My Data"
}

export const nameDisplayField = {
    baseType: "title_plural",
    type: "title_plural",
    assistant: "",
    myData: "",
    instance: "name"
}

const initialState = {
    current: "base",
    path: [
        {...assistantPathObject},
        {...myDataPathObject}
    ],
    activeSelection: {type: "myData",selection: {}},
    status: "idle", // loading state
};

const displaySlice = createSlice({
    name: "display",
    initialState,
    reducers: {
        setDisplay(state, action) {
            state.current = action.payload;
        },
        setDisplayPath(state, action) {
            state.path = action.payload;
        },
        //{type: typeAsString,selection: {}}
        setActiveSelection(state,action) {
            state.activeSelection.type = action.payload.type;
            state.activeSelection.selection = action.payload.selection;
        },
        //{field: theFieldToAddTo-mustBeArray,element: theElementToAdd}
        addElementToActiveSelectionField(state,action) {
            state.activeSelection.selection[action.payload.field].push(action.payload.element);
        }
    }
})

export default displaySlice.reducer;

export const { setDisplay, setDisplayPath, setActiveSelection, addElementToActiveSelectionField } = displaySlice.actions;
