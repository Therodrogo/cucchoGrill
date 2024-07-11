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

router.get('/obtenerproductoid/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findById(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).send(producto);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/actualizarProducto/', async (req, res) => {
  const { _id ,nombre, precio, ingredientes, categoria, foto, visible } = req.body;

  // Validar que los campos obligatorios están presentes
  if (!nombre || !precio || !categoria) {
    return res.status(400).json({ error: 'Los campos nombre, precio y categoría son obligatorios' });
  }

  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      _id,
      { nombre, precio, ingredientes, categoria, foto, visible },
      { new: true, runValidators: true } // Esto devuelve el documento actualizado y ejecuta las validaciones del schema
    );

    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

router.delete('/eliminarproducto/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Producto.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.put('/actualizarVisibilidad/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findById(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Alternar el valor de visibilidad
    producto.visible = !producto.visible;

    const productoActualizado = await producto.save();

    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la visibilidad del producto' });
  }
});

module.exports = router;
