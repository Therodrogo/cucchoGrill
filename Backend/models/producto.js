const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  ingredientes: [{ type: String }],
  categoria: { type: String, required: true },
  foto: { type: String },
  visible: { type: Boolean, default: true }
});

const Producto = mongoose.model('Producto', ProductoSchema);
module.exports = Producto;