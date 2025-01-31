const API_URL = "http://localhost:5000/api";

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la requête");
    }
    return response.json();
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la requête");
    }
    return response.json();
  },

  delete: async (endpoint) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la requête");
    }
    return response.json();
  },

  put: async (endpoint, data) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la requête");
    }
    return response.json();
  },
};
