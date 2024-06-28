const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

// Conexion DB Local
// const uri = 'mongodb://localhost:27017/myapp';

// Conexion DB nube
// const uri = process.env.MONGODB_URI;

const uri = "mongodb+srv://cucchogrill:dYBgAsmrznfRw1Bz@cluster0.b99um9w.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0"; // Cambia 'mydatabase' al nombre de tu base de datos

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Usando promesas
mongoose.connect(uri, options).then(
  () => { console.log('Conectado a DB'); },
  err => { console.log('Error al conectar a DB:', err); }
);

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', require('../routes/usuario'));
app.use('/api', require('../routes/producto'));
app.use('/api', require('../routes/promocion'));
app.use('/api', require('../routes/pedido'));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('Example app listening on port ' + app.get('puerto'));
});