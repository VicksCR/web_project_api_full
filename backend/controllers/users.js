const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const BadRequestError = require("../errors/bad-request-err");
const UnauthorizedError = require("../errors/unauthorized-err");
const NotFoundError = require("../errors/not-found-err");

const { NODE_ENV, JWT_SECRET } = process.env;

//Obtener todos los usuarios
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

//Obtener usuario por ID
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => new NotFoundError("Usuario no encontrado"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("ID de usuario inválido"));
      }
      return next(err);
    });
};

//Crear nuevo usuario
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Email y contraseña son obligatorios"));
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      const { password, ...userData } = user.toObject();
      res.status(201).send(userData);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(
          new BadRequestError("El correo electrónico ya está registrado")
        );
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Datos inválidos"));
      }
      return next(err);
    });
};

//Obtener el usuario actual por token
module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => new NotFoundError("Usuario no encontrado"))
    .then((user) => res.send(user))
    .catch(next);
};

//Actualizar perfil de usuario
module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("Usuario no encontrado"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Datos inválidos"));
      }
      return next(err);
    });
};

//Actualizar avatar de usuario
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("Usuario no encontrado"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Datos inválidos"));
      }
      return next(err);
    });
};

//Login de usuario (autenticacion)
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" }
      );
      res.send({ token });
    })
    .catch(next);
};
