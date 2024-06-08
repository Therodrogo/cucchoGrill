const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');

// POST: Crear un nuevo producto
router.post('/nuevoproducto', async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).send(producto);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET: Obtener todos los productos
router.get('/obtenerproductos', async (req, res) => {
  try {
    const productos = await Producto.find({});
    res.status(200).send(productos);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT: Actualizar un producto por ID
router.put('/actualizarproducto:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!producto) {
      return res.status(404).send();
    }
    res.send(producto);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
