const express = require('express')
const authRoutes = require('./routes/auth.js')
const mongoose = require('mongoose')
const dashboardRoutes = require('./routes/dashboard')
const verifyToken = require('./routes/validate-token')
const cors = require('cors')
require('dotenv').config()



const uri = `mongodb+srv://jhonsalazar01:gYNE3RqRJfNpRi0y@final.0ux8x.mongodb.net/?retryWrites=true&w=majority&appName=Final`;

mongoose
  .connect(uri)
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch((e) => {
    console.log('Error de conexión a la base de datos:', e);
  });


var corsOptions = {
  origin: '*', // Aqui debemos reemplazar el * por el dominio del cliente
  optionsSuccessStatus: 200 // Es necesario para navegadores antiguos o algunos SmartTVs
}

const app = express()



app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', authRoutes)
app.use('/api/dashboard', verifyToken, dashboardRoutes)


app.get('/', (req, res) => {
  res.json({ mensaje: 'My Auth Api Rest' })
})

const PORT = process.env.PORT || 8002
app.listen(PORT, () => {
  console.log(`Tu servidor está corriendo en el puerto: ${PORT}`)
})
