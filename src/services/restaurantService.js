const API_URL = "http://localhost:5000/api";

export const restaurantService = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/restaurants`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des restaurants");
    }
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/restaurants/${id}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du restaurant");
    }
    return response.json();
  },

  create: async (restaurantData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/restaurants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(restaurantData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la création du restaurant");
    }
    return response.json();
  },

  update: async (id, restaurantData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/restaurants/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(restaurantData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour du restaurant");
    }
    return response.json();
  },

  delete: async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/restaurants/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du restaurant");
    }
  },
};
