const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedido');

// POST: Crear un nuevo pedido
router.post('/nuevopedido', async (req, res) => {
  try {
    const pedido = new Pedido(req.body);
    await pedido.save();
    res.status(201).send(pedido);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET: Obtener todos los pedidos
router.get('/obtenerpedidos', async (req, res) => {
  try {
    const pedidos = await Pedido.find({}).populate('promociones').populate('productos');
    res.status(200).send(pedidos);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT: Actualizar un pedido por ID
router.put('actualizarpedido/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!pedido) {
      return res.status(404).send();
    }
    res.send(pedido);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
