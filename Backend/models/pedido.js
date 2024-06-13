const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PedidoSchema = new Schema({
  nombreCliente: { type: String},
  numMesa: { type: Number},
  promociones: [{ type: Schema.Types.ObjectId, ref: 'Promocion' }],
  productos: [{ type: Schema.Types.ObjectId, ref: 'Producto' }],
  fecha: { type: Date, default: Date.now },
  estado: { type: String, required: true }
});

const Pedido = mongoose.model('Pedido', PedidoSchema);
module.exports = Pedido;