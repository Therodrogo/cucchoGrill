const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromocionSchema = new Schema({
  nombre: { type: String, required: true },
  productos: [{ type: Schema.Types.ObjectId, ref: 'Producto', required: true }],
  precioTotal: { type: Number, required: true },
  descuento: { type: Number },
  precioOferta: { type: Number },
  fotoPromo: { type: String },
  visible: { type: Boolean, default: true }
});

const Promocion = mongoose.model('Promocion', PromocionSchema);
module.exports = Promocion;