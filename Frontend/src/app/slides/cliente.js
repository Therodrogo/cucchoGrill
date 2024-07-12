import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

const clienteSlice = createSlice({
  name: 'clienteSlice',
  initialState,
  reducers: {
    updateCliente: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateCliente } = clienteSlice.actions;

export default clienteSlice.reducer;
