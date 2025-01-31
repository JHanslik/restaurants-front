const API_URL = "http://localhost:5000/api";

export const reviewService = {
  addReview: async (restaurantId, reviewData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/restaurants/${restaurantId}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout de l'avis");
    }

    return response.json();
  },

  deleteReview: async (restaurantId, reviewId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/restaurants/${restaurantId}/reviews/${reviewId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l'avis");
    }
  },
};
