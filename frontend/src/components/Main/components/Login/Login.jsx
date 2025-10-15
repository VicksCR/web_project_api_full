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
