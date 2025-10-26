import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../../blocks/login.css";

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData.email, formData.password);
  };

  return (
    <>
      <header></header>
      <div className="login">
        <form
          className="login__form"
          name="login-form"
          noValidate
          onSubmit={handleSubmit}
        >
          <h2 className="login__title">Inicia sesión</h2>
          <input
            className="login__input"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <input
            className="login__input"
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <button
            type="submit"
            className="login__submit-button"
            disabled={!formData.email || !formData.password}
          >
            Inicia sesión
          </button>
        </form>
        <div className="login__redirect-container">
          <p className="login__redirect">
            ¿Aún no eres miembro?{" "}
            <Link to="/signup" className="login__link">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

/* OTRA VERSION, SI ESTA JALA DEJAR ESA, NO PONER ESTA O REVISAAR SI ESTA TAMBIEN JALA

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../../blocks/login.css";

export default function Login({ onLogin, infoToolTip, setInfoToolTip }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setInfoToolTip({
        open: true,
        success: false,
        message: "Por favor, completa todos los campos.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await onLogin(formData.email, formData.password);
    } catch (error) {
      setInfoToolTip({
        open: true,
        success: false,
        message: "Error al iniciar sesión. Intenta de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header></header>
      <div className="login">
        <form
          className="login__form"
          name="login-form"
          noValidate
          onSubmit={handleSubmit}
        >
          <h2 className="login__title">Inicia sesión</h2>
          <input
            className="login__input"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <input
            className="login__input"
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <button
            type="submit"
            className="login__submit-button"
            disabled={!formData.email || !formData.password || isSubmitting}
          >
            {isSubmitting ? "Ingresando..." : "Inicia sesión"}
          </button>
        </form>
        <div className="login__redirect-container">
          <p className="login__redirect">
            ¿Aún no eres miembro?{" "}
            <Link to="/signup" className="login__link">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

*/
