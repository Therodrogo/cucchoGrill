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
    const promociones = await Promocion.find({});
    res.status(200).send(promociones);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET: Obtener una promoción por ID
router.get('/obtenerpromocionid/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const promocion = await Promocion.findById(id);

    if (!promocion) {
      return res.status(404).json({ error: 'Promoción no encontrada' });
    }

    res.status(200).send(promocion);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT: Actualizar una promoción
router.put('/actualizarpromocion', async (req, res) => {
  const { _id, nombre, productos, precioTotal, descuento, precioOferta, fotoPromo, visible } = req.body;

  // Validar que los campos obligatorios están presentes
  if (!nombre || !productos || productos.length === 0 || !precioTotal || !descuento || !precioOferta) {
    return res.status(400).json({ error: 'Los campos nombre, productos, precio total, descuento y precio oferta son obligatorios' });
  }

  try {
    const promocionActualizada = await Promocion.findByIdAndUpdate(
      _id,
      { nombre, productos, precioTotal, descuento, precioOferta, fotoPromo, visible },
      { new: true, runValidators: true } // Esto devuelve el documento actualizado y ejecuta las validaciones del schema
    );

    if (!promocionActualizada) {
      return res.status(404).json({ error: 'Promoción no encontrada' });
    }

    res.json(promocionActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la promoción' });
  }
});

// DELETE: Eliminar una promoción
router.delete('/eliminarpromocion/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Promocion.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Promoción no encontrada' });
    }

    res.status(200).json({ message: 'Promoción eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
});

// PUT: Actualizar la visibilidad de una promoción
router.put('/actualizarvisibilidad/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const promocion = await Promocion.findById(id);

    if (!promocion) {
      return res.status(404).json({ error: 'Promoción no encontrada' });
    }

    // Alternar el valor de visibilidad
    promocion.visible = !promocion.visible;

    const promocionActualizada = await promocion.save();

    res.json(promocionActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la visibilidad de la promoción' });
  }
});

module.exports = router;
