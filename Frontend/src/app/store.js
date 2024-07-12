import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './slides/example.js';
import exampleReducer2 from './slides/example2.js';
import exampleReducer3 from './slides/example3.js';
import pedidoCursoReducer from './slides/PedidoCurso.js';
import clienteReducer from './slides/cliente.js';
import pedidoViewReducer from './slides/pedidoView.js';

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    example2: exampleReducer2,
    example3: exampleReducer3,
    pedidoCurso: pedidoCursoReducer,
    cliente: clienteReducer,
    pedidoView: pedidoViewReducer

  },
});
