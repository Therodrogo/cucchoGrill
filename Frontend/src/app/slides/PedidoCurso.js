import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

const pedidoCurso = createSlice({
  name: 'pedidoCurso',
  initialState,
  reducers: {
    updatePedidoCurso: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updatePedidoCurso } = pedidoCurso.actions;

export default pedidoCurso.reducer;
