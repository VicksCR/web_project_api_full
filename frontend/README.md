NOMBRE DEL PROYECTO: autenticación y autorización del front end. Around the US - Express

DESCRIPCION DEL PROYECTO: Este proyecto es una continuación para el proyecto "Alrededor de los EE. UU, aprendiendo a trabajar ahora con la autenticación y autorización de usuarios para proporcionar seguridad inicial a la página web. Se da enfoque a procesos de autenticación con nuevas ventanas para inicio de sesión, registro y pagina inicial para el usuario ya autenticado y autorizado.

Se implementa el uso de token web para autenticar a un mismo usuario con el servidor generando un token específicamente JWT basado en JSON

Por otro lado, se pone en práctica la redirección de usuario para la navegación de usuarios entre /login y /register, /profile y la ruta raíz.

También se implementa el uso de protección de rutas en el front-end, además del registro de usuarios y como la página muestra hacia el usuario si el inicio de sesión o registro fue exitoso.

Se utilizan el almacenamiento local con la devolución de JWT a través de localStorage y la verificacion de usuarios. Y por último también la implementación del cierre de sesión y la eliminación del token de localStorage y redirigir al usuario a la página de registro.

DESCRIPCION DE LAS TECNOLOGIAS Y TECNICAS UTILIZADAS
Se reutiliza el código del sprint 10 para dar continuidad a la página Around the US, con la implementación de la autenticación, token JWT, Postman y continuidad de React+Vite con "react-router-dom".

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
