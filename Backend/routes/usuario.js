
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// POST: Crear un nuevo usuario
router.post('/nuevousuario', async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).send(usuario);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET: Obtener todos los usuarios
router.get('/obtenerusuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find({});
    res.status(200).send(usuarios);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT: Actualizar un usuario por ID
router.put('/actualizarusuario:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!usuario) {
      return res.status(404).send();
    }
    res.send(usuario);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

//comprobacion de usuario login
router.post('/login', async (req, res) => {
  try {
    const { nombre, contraseña } = req.body;
    const usuario = await Usuario.findOne({ nombre });
    if (!usuario) {
      return res.status(404).send({ error: 'Usuario no encontrado' });
    }

    const esContraseñaValida = await usuario.compararContraseña(contraseña);
    if (!esContraseñaValida) {
      return res.status(400).send({ error: 'Contraseña incorrecta' });
    }

    res.send({ message: 'Login exitoso', usuario });
  } catch (error) {
    res.status(500).send(error);
  }
});