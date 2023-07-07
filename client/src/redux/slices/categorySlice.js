import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const fetchCategory = createAsyncThunk(
    "/categories?populate=image",
    async () => {
        const response = await axiosClient.get("/categories?populate=image");
        // console.log("redux : " , response);

        return response?.data.data;
    }
);

const categorySlice = createSlice({
    name: "categorySlice",
    initialState: {
        category: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.category = action.payload;
        });
    },
});

export default categorySlice.reducer;
