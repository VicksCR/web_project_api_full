require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { errors: celebrateErrors, celebrate, Joi } = require("celebrate");
const { validateURL } = require("./middleware/validators");

const { createUser, login } = require("./controllers/users");
const { requestLogger, errorLogger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const auth = require("./middleware/auth");

const NotFoundError = require("./errors/not-found-err");

const { PORT = 3000 } = process.env;
const app = express();

const cors = require("cors");

const allowedOrigins = [
  "https://aroundcr.minnsroad.com",
  "https://www.aroundcr.minnsroad.com",
  "https://api.aroundcr.minnsroad.com",
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Origin not allowed by CORS"));
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "Origin",
    "X-Requested-With",
  ],
  credentials: true,
  optionsSuccessStatus: 204,
};

//Conexion a MongoDB
mongoose
  .connect("mongodb://localhost:27017/aroundb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

app.use(express.json());

//Configuración de CORS
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(requestLogger);

/*
No creo que se deba usar throw
//Ruta de prueba para crash (verifica que PM2 o reinicio automático funciona)
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caerse");
  }, 0);
});
*/

//Rutas publicas (no token)
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

app.use(auth);
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

//Middleware de manejo de errores centralizado
app.use((req, res, next) => {
  next(new NotFoundError("Recurso solicitado no encontrado"));
});

//Middleware de manejo de errores Celebrate
app.use(errorLogger);

app.use(celebrateErrors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
