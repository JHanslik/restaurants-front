const API_URL = "http://localhost:5000/api";

export const imageService = {
  uploadImages: async (restaurantId, formData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/restaurants/${restaurantId}/images`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de l'upload des images");
    }

    return response.json();
  },
};
