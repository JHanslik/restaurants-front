import { api } from "./api";

export const reviewService = {
  addReview: async (restaurantId, reviewData) => {
    try {
      const response = await api.post(
        `/restaurants/${restaurantId}/avis`,
        reviewData
      );
      return response.data;
    } catch (error) {
      throw new Error("Erreur lors de l'ajout de l'avis");
    }
  },

  deleteReview: async (restaurantId, reviewId) => {
    try {
      const response = await api.delete(
        `/restaurants/${restaurantId}/avis/${reviewId}`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur détaillée:", error.response || error);
      throw new Error("Erreur lors de la suppression de l'avis");
    }
  },
};
