import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:5000/api";

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Une erreur est survenue");
  }

  return response.json();
};

export const useAddReview = (restaurantId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewData) => {
      return fetchWithAuth(`${API_URL}/restaurants/${restaurantId}/avis`, {
        method: "POST",
        body: JSON.stringify(reviewData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurants", restaurantId]);
      toast.success("Avis ajouté avec succès");
    },
    onError: (error) => {
      toast.error(error.message || "Erreur lors de l'ajout de l'avis");
    },
  });
};

export const useDeleteReview = (restaurantId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId) => {
      return fetchWithAuth(
        `${API_URL}/restaurants/${restaurantId}/avis/${reviewId}`,
        {
          method: "DELETE",
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurants", restaurantId]);
      toast.success("Avis supprimé avec succès");
    },
    onError: (error) => {
      toast.error(error.message || "Erreur lors de la suppression de l'avis");
    },
  });
};
