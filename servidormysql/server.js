import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' }));

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Juanita2303',
  database: 'carritocomprasdb'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Middleware para registrar las solicitudes entrantes
app.use((req, res, next) => {
  console.log(`Solicitud recibida en ${req.method} ${req.url}`);
  next();
});

app.post('/registro', (req, res) => {
  console.log('Solicitud recibida en /registro:', req.body);

  const {UserName, UserLastName, UserMail, UserPassword} = req.body;

  const sql = `INSERT INTO usuarios (UserName, UserLastName, UserMail, UserPassword) VALUES (?, ?, ?, ?)`;
  const values = [UserName, UserLastName, UserMail, UserPassword];

  connection.query(sql, values, (err, result) => {
    if (err) {  
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al registrar el usuario');
    } else {
      console.log('Usuario registrado exitosamente');
      res.status(200).send('Usuario registrado exitosamente');
    }
  });
});

// Inicio de sesión de usuarios
app.post('/login', (req, res) => {
  console.log('Solicitud recibida en /login:', req.body);

  const { UserMail, UserPassword, UserName, UserLastname } = req.body;

  const sql = `SELECT * FROM usuarios WHERE UserMail = ? AND UserPassword = ?`;
  const values = [UserMail, UserPassword, UserName, UserLastname];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error en el servidor');
    } else {
      if (result.length > 0) {
        console.log('Inicio de sesión exitoso');
        res.status(200).send('Inicio de sesión exitoso');
      } else {
        console.log('Usuario y/o contraseña incorrectos');
        res.status(401).send('Usuario y/o contraseña incorrectos');
      }
    }
  });
});

app.get('/', (req, res) => {
  // Mensaje de conexión exitosa con la base de datos
  res.send('¡El servidor backend está conectado correctamente con la base de datos!');
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});






