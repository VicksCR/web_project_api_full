/* CREAR AL CARGAR VARIABLES DE ENTORNO CON ARCHIVO .ENV
require("dotenv").config();
*/
const express = require("express");
const mongoose = require("mongoose");
const { errors: celebrateErrors, celebrate, Joi } = require("celebrate");
const validator = require("validator");

const { createUser, login } = require("./controllers/users");
const { requestLogger, errorLogger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const auth = require("./middleware/auth");

const NotFoundError = require("./errors/not-found-err");

const { PORT = 3000 } = process.env;
const app = express();

//Conexion a MongoDB
mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Middlewares JSON
app.use(express.json());
app.use(requestLogger);

//Validacion para URLs
const validateURL = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }
  return helpers.error("string.uri");
};

//Rutas Publicas (no token)
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateURL),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);

//Auth global - todas las rutas que esten debajo de este middleware
app.use(auth);

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError("Recurso solicitado no encontrado"));
});

app.use(errorLogger);
app.use(celebrateErrors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
