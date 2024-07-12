import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

const exampleSlice3 = createSlice({
  name: 'example3',
  initialState,
  reducers: {
    updateMenuLogin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateMenuLogin } = exampleSlice3.actions;

export default exampleSlice3.reducer;
