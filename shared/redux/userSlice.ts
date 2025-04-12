import { createSlice } from "@reduxjs/toolkit";

const initialState: object = [];

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedUser: (state, { payload }) => {
      state = payload;
    },
  },
});

export const {setLoggedUser} = userSlice.actions;
export default userSlice.reducer;