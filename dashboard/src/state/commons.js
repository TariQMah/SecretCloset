import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    spottedCategories: [],
};

export const commonSlice = createSlice({
    name: "commons",
    initialState,
    reducers: {

        setSpottedCategories: (state, action) => {
            return {
                ...state,
                spottedCategories: action.payload, // Assuming you pass an array as payload
            };
        },

    },
});

export const { setSpottedCategories } = commonSlice.actions;

export default commonSlice.reducer;