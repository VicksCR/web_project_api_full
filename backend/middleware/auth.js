const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-error");
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(403)
      .send({ message: "Acceso prohibido, se requiere autorización" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
    req.user = payload;
  } catch (err) {
    return next(new UnauthorizedError("Se requiere autorizacion"));
  }

  return next();
};
