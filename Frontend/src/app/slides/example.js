import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    updateString: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateString } = exampleSlice.actions;

export default exampleSlice.reducer;
