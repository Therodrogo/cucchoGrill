const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: String,
    esProfe: Boolean,
    correo: { type: String, unique: true },
    contrasena: String,
    imagenperfil: String,
    modulo: [{ type: Schema.Types.ObjectId, ref: 'modulo' }],
    planilla: [{ type: Schema.Types.ObjectId, ref: 'planilla' }],
}, { versionKey: false }
);

const usuario = mongoose.model('usuario', usuarioSchema);
module.exports = usuario;