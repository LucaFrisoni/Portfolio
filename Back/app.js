const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require("cors");
const logger = require("morgan");



const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //Autorizo recibir solicitudes de este dominio
    res.header("Access-Control-Allow-Credentials", true); //Autorizo recibir solicitudes que incluyan el encabezado con credenciales
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    ); //Autorizo recibir solicitudes con dichos hedears
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); //Autorizo las solicitudes tipo GET, POST, OPTIONS, PUT y DELETE.
    next(); // para pasar el control al siguiente middleware
  });
  
  app.use(logger("dev"));



app.get("/",(req,res)=>{
res.send("Hola papito")
})

// Ruta para manejar el envío del formulario
app.post('/contact', (req, res) => {
  const {fullName,email,phoneNumber,subject,message} = req.body;

  // La idea es que el email que recibo por body es quien me envie el mail a mi correo
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'reStorePFHenry@gmail.com',
      pass: 'vrczzeekxahsxrvb',
    },
    tls: {
      rejectUnauthorized: false, // Ignorar la verificación del certificado
    },
  });

  // Configurar el mensaje de correo electrónico
  const mailOptions  = {
    from: email,
    to: 'frisoniluca1@gmail.com',
    subject: subject,
    html: `
    <h3>Hola soy ${fullName},mi numero es ${phoneNumber}</h3>
    <p>${message}</p>
    <p>Mi mail es el siguiente ${email}</p>
  
  `,
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions , (error, info) => {
    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
      res.status(500).json({ message: 'Hubo un error al enviar el formulario.' });
    } else {
      console.log('Correo electrónico enviado:', info.response);
      res.status(200).json({ message: 'El formulario se ha enviado exitosamente.' });
    }
  });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Server raised in port: http://localhost:3000');
});