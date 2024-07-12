import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'nologin',
};

const exampleSlice2 = createSlice({
  name: 'example2',
  initialState,
  reducers: {
    updateLogin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateLogin } = exampleSlice2.actions;

export default exampleSlice2.reducer;
