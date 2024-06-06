const express = require('express');
const router = express.Router();
const usuarioSchema = require('../models/usuario.js');

// Agregar un usuario
router.post('/addusuario', async (req, res) => {
  const body = req.body;
  const usuario = new usuarioSchema(body);
  await usuario.save()
    .then((result) => {
      res.send(true)
    })
    .catch((err) => {
      console.log(err)
      res.send(false)
    });
}
);

//comprobacion de usuario login
router.post('/login', async (req, res) => {
  const body = req.body;
  console.log(body)
  const contrasena = body.contrasena
  const correo = body.correo
  const resp = await usuarioSchema.findOne({ correo, contrasena })
    .then((result) => {
      console.log("result")
      console.log(result)
      console.log(JSON.stringify(result))
      if (JSON.stringify(result) !== "null") {
        result.contrasena = ""
        res.json(result)
      } else {
        res.send(false)
      }
    })
    .catch((err) => {
      res.json(err)
    });

});

// Obtener usuario con un id
router.get('/getusuarioid/:id', async (req, res) => {
  const userID = req.params.id
  console.log(req.params)
  await usuarioSchema.findOne({
    _id: userID

  })
    .then((result) => {
      console.log(result)
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    });

}
);
// Obtener usuario con un id
router.get('/getnombreusuarioid/:id', async (req, res) => {
  const userID = req.params.id
  console.log(req.params)
  await usuarioSchema.findOne({
    _id: userID
  })
    .then((result) => {
      const data = {
        nombre: result.nombre
      }
      res.json(data)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    });

}
);


// Ruta para agregar un nuevo módulo a un usuario
router.post('/agregarmodulo/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;
  const { nombreModulo, participantes, tareas } = req.body;

  try {
    const usuario = await usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    const nuevoModulo = new Modulo({
      nombre: nombreModulo,
      participantes,
      tareas,
    });


    await nuevoModulo.save();

    usuario.modulo.push(nuevoModulo._id);
    await usuario.save();

    res.status(201).json({ mensaje: 'Módulo agregado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});


router.get('/getallusuarios', async (req, res) => {
  const usuarios = await usuarioSchema.find()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    });

});

module.exports = router;
