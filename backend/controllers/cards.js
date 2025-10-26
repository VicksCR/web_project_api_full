const Card = require("../models/card");

const BadRequestError = require("../errors/bad-request-err");
const ForbiddenError = require("../errors/forbidden-err");
//const UnauthorizedError = require("../errors/unauthorized-err");
const NotFoundError = require("../errors/not-found-err");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Datos inválidos"));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError("Tarjeta no encontrada"))
    .then((card) => {
      if (card.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError("No puedes borrar tarjetas de otros usuarios");
      }
      return card.deleteOne();
    })
    .then(() => {
      res.send({ message: "Tarjeta eliminada" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("ID de tarjeta inválido"));
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("Tarjeta no encontrada"))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("ID de tarjeta inválido"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Datos inválidos"));
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("Tarjeta no encontrada"))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("ID de tarjeta inválido"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Datos inválidos"));
      }
      return next(err);
    });
};
