import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  // __v: '',
  _id: "",
  name: "",
  email: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfileData } = profileSlice.actions;

export default profileSlice.reducer;
