import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const postNew = createAsyncThunk("commands/postNew", (config) => {
    return fetch('/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
    })
        .then((response) => response.json())
        .then((data) => data);
    });

export const postNote = createAsyncThunk("commands/postNote", (config) => {
    return fetch('/note', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
    })
        .then((response) => response.json())
        .then((data) => data);
    });

export const postAssignment = createAsyncThunk("commands/postAssignment", (config) => {
    return fetch('/assign', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
    })
        .then((response) => response.json())
        .then((data) => data);
    });

export const postAdd = createAsyncThunk("commands/postAdd", (config) => {
    return fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
    })
        .then((response) => response.json())
        .then((data) => data);
    });

export const nextCommand = {
    new: [
        {
            select: "autocomplete",
            options: [
                {
                    id: 0,
                    choose: "custom",
                    displayVariants: {
                        assistant: {
                            id: 0,
                            display: {id: "general type",title_singular: "general type"},
                            command: "new general type",
                            set: {
                                make: "type",
                                parent_type_id: ""
                            }
                        },
                        myData: {
                            id: 0,
                            display: {id: "general type",title_singular: "general type"},
                            command: "new general type",
                            set: {
                                make: "type",
                                parent_type_id: ""
                            }
                        }
                    },
                    display: {id: "type of",title_singular: "type of"},
                    command: "new type of",
                    set: {
                        make: "type",
                        name: ""
                    }
                },
                {
                    id: 1,
                    choose: "type_singular",
                    display: {},
                    command: "new type_singular",
                    setToValue: {
                        parent_type_id: "id"
                    },
                    set: {
                        make: "instance",
                        title_singular: "",
                        title_plural: ""
                    }
                } 
            ]
        }
    ],
    "new type_singular": [
        {
            text: " : "
        },
        {
            input: "string",
            label: "Name",
            setAs: "name"
        }
    ],
    "new type of": [
        {
            select: "autocomplete",
            options: [
                {
                    id: 0,
                    display: {},
                    choose: "type_singular",
                    command: "new type of type_singular",
                    setToValue: {
                        parent_type_id: "id"
                    }
                }
            ]
        }
    ],
    "new type of type_singular": [
        {
            text: " : "
        },
        {
            input: "string",
            label: "Title (singular)",
            setAs: "title_singular"
        },
        {
            input: "string",
            label: "Title (plural)",
            setAs: "title_plural"
        }
    ],
    "new general type": [
        {
            text: " : "
        },
        {
            input: "string",
            label: "Title (singular)",
            setAs: "title_singular"
        },
        {
            input: "string",
            label: "Title (plural)",
            setAs: "title_plural"
        }
    ],
    assign: [
    ],
    note: [
        {
            text: " about "
        },
        {
            activeSelection: "display"
        },
        {
            input: "string",
            multiline: 4,
            label: "Note",
            setAs: "note" 
        }
    ],
    add: [
    ],
}

export const configs = {
    new: {
        make: "type",
        parent_type_id: "",
        title_singular: "",
        title_plural: "",
        name: ""
    },
    assign: {
        action_title: "grants many",
        type_a_id: "", 
        type_b_id: "",
        to: "many"
    },
    note: {
        isNote: true,
        note: "",
    },
    add: {
        action_title: "has",
        instance_a_id: "",
        instance_b_id: "",
        type_a_id: "",
        type_b_id: "",
    }
}

const initialState = {
    actionOptions: ["new","assign","note","add"],
    commandStrings: ["new"],
    optionSelections: [0],
    config: {...configs.new},
    errors: {},
    status: "idle"
}

const commandsSlice = createSlice({
    name: "commands",
    initialState,
    reducers: {
        //payload should be {command: "",index: index}
        editCommandString(state, action) {
            let newArray = state.commandStrings.slice(0,action.payload.index)
            state.commandStrings = [...newArray,action.payload.command];
        },
        setCommandStrings(state, action) {
            state.commandStrings = action.payload
        },
        setConfig(state,action) {
            state.config = action.payload;
        },
        resetConfig(state,action) {
            console.log("reset config payload is ",action.payload);
            if (action.payload){
                state.config = {...configs[action.payload]};
            } else {
                state.config = configs[state.commandStrings[0]];
            }
        },
        //{key: keyToChange,value: newValue}
        changeConfig(state,action) {
            state.config[action.payload.key] = action.payload.value;
        },
        editOptionSelections(state, action) {
            //payload should be {selection: index,index: index}
            let newArray = state.optionSelections.slice(0,action.payload.index)
            state.optionSelections = [...newArray,action.payload.selection];
        }
    },
    extraReducers: {
        [postNew.pending](state) {
            state.status = "loading";
          },
        [postNew.rejected](state) {
            state.status = "idle";
        },
        [postNew.fulfilled](state, action) {
            if (action.payload.errors) {
                state.errors = action.payload.errors;
                console.log(action.payload.errors)
            } else {
                state.errors = {};
                console.log(action.payload.message)
            }
            state.status = "idle";
        },
        [postNote.pending](state) {
            state.status = "loading";
          },
        [postNote.rejected](state) {
            state.status = "idle";
        },
        [postNote.fulfilled](state, action) {
            if (action.payload.errors) {
                state.errors = action.payload.errors;
                console.log(action.payload.errors)
            } else {
                state.errors = {};
                console.log(action.payload)
            }
            state.status = "idle";
        },
        [postAssignment.pending](state) {
            state.status = "loading";
          },
        [postAssignment.rejected](state) {
            state.status = "idle";
        },
        [postAssignment.fulfilled](state, action) {
            if (action.payload.errors) {
                state.errors = action.payload.errors;
                console.log(action.payload.errors)
            } else {
                state.errors = {};
                console.log(action.payload)
            }
            state.status = "idle";
        },
        [postAdd.pending](state) {
            state.status = "loading";
          },
        [postAdd.rejected](state) {
            state.status = "idle";
        },
        [postAdd.fulfilled](state, action) {
            if (action.payload.errors) {
                state.errors = action.payload.errors;
                console.log(action.payload.errors)
            } else {
                state.errors = {};
                console.log(action.payload)
            }
            state.status = "idle";
        }
    }
})

export default commandsSlice.reducer

export const { editCommandString, setConfig, editOptionSelections, changeConfig, resetConfig, setCommandStrings } = commandsSlice.actions;