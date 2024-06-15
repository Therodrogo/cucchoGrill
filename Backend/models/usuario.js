const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  contrasena: { type: String, required: true },
  rol: { type: String, required: true }
});

UsuarioSchema.pre('save', async function (next) {
  const usuario = this;
  if (usuario.isModified('contrasena')) {
    usuario.contrasena = await bcrypt.hash(usuario.contrasena, 8);
  }
  next();
});

UsuarioSchema.methods.compararContrasena = async function (contrasenaIngresada) {
  const usuario = this;
  return await bcrypt.compare(contrasenaIngresada, usuario.contrasena);
};


const Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;