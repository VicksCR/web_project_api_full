const express = require("express");
const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

const router = express.Router();

// Validacion para URLs
const validateURL = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }
  return helpers.error("string.uri");
};

router.get("/", getCards);

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard
);

router.delete(
  "/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteCard
);

router.put(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
  }),
  likeCard
);

router.delete(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
  }),
  dislikeCard
);

module.exports = router;
