const express = require("express");
const { celebrate, Joi } = require("celebrate");
const Validator = require("validator");

const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/users");

const router = express.Router();

// Validacion para URLs
const validateURL = (value, helpers) => {
  if (Validator.isURL(value, { require_protocol: true })) {
    return value;
  }
  return helpers.error("string.uri");
};

router.get("/me", getCurrentUser);

router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile
);

router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateAvatar
);

router.get("/", getUsers);

router.get(
  "/:userId",
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24).required(),
    }),
  }),
  getUserById
);

module.exports = router;
