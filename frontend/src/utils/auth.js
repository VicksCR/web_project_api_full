export const BASE_URL = "https://localhost:3000";
//"https://se-register-api.en.tripleten-services.com/v1";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(text || `Error: ${res.status}`);
      });
    }
    return res.json();
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(text || `Error: ${res.status}`);
      });
    }
    return res.json();
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(text || `Error: ${res.status}`);
      });
    }
    return res.json();
  });
};

/*
export const BASE_URL = "https://localhost:3000";
//"https://se-register-api.en.tripleten-services.com/v1";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(text || `Error: ${res.status}`);
      });
    }
    return res.json();
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(text || `Error: ${res.status}`);
      });
    }
    return res.json();
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(text || `Error: ${res.status}`);
      });
    }
    return res.json();
  });
};
*/
