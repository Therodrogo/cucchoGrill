const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  contraseña: { type: String, required: true },
  rol: { type: String, required: true }
});

UsuarioSchema.pre('save', async function (next) {
    const usuario = this;
    if (usuario.isModified('contraseña')) {
      usuario.contraseña = await bcrypt.hash(usuario.contraseña, 8);
    }
    next();
  });

const Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;