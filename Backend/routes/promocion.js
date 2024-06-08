const express = require('express');
const router = express.Router();
const Promocion = require('../models/promocion');

// POST: Crear una nueva promoción
router.post('/nuevapromocion', async (req, res) => {
  try {
    const promocion = new Promocion(req.body);
    await promocion.save();
    res.status(201).send(promocion);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET: Obtener todas las promociones
router.get('/obtenerpromociones', async (req, res) => {
  try {
    const promociones = await Promocion.find({}).populate('productos');
    res.status(200).send(promociones);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT: Actualizar una promoción por ID
router.put('/actualizarpromocion:id', async (req, res) => {
  try {
    const promocion = await Promocion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!promocion) {
      return res.status(404).send();
    }
    res.send(promocion);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
