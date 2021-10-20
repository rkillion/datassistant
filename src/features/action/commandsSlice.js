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
                            }
                        },
                        myData: {
                            id: 0,
                            display: {id: "general type",title_singular: "general type"},
                            command: "new general type",
                            set: {
                                make: "type",
                            }
                        }
                    },
                    display: {id: "type of",title_singular: "type of"},
                    command: "new type of",
                    set: {
                        make: "type",
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
        {
            label: "not yet built"
        }
    ]
}

export const configs = {
    new: {
        make: "type",
        parent_type_id: "",
        title_singular: "",
        title_plural: "",
        name: ""
    },
    assign: {}
}

const initialState = {
    actionOptions: ["new","assign"],
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
        setConfig(state,action) {
            state.config = action.payload;
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
        }
    }
})

export default commandsSlice.reducer

export const { editCommandString, setConfig, editOptionSelections, changeConfig } = commandsSlice.actions;