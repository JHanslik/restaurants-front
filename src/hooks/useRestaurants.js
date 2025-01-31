import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useContext, useCallback, useState } from "react";
import { RestaurantContext } from "../context/RestaurantContext";
import { restaurantService } from "../services/restaurantService";
import { reviewService } from "../services/reviewService";
import { imageService } from "../services/imageService";

const API_URL = "http://localhost:5000/api";

// Fonction utilitaire pour les requêtes fetch
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

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error(
      "useRestaurants doit être utilisé dans un RestaurantProvider"
    );
  }

  const fetchRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      console.log("Fetching restaurants...");
      const response = await restaurantService.getAll();
      console.log("Restaurants received:", response);
      setRestaurants(response.restaurants || []);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      toast.error("Erreur lors du chargement des restaurants");
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createRestaurant = async (restaurantData) => {
    try {
      setLoading(true);
      const newRestaurant = await restaurantService.create(restaurantData);
      setRestaurants([...restaurants, newRestaurant]);
      toast.success("Restaurant créé avec succès");
      return newRestaurant;
    } catch (error) {
      toast.error("Erreur lors de la création du restaurant");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateRestaurant = async (id, restaurantData) => {
    try {
      setLoading(true);
      const updatedRestaurant = await restaurantService.update(
        id,
        restaurantData
      );
      setRestaurants(
        restaurants.map((r) => (r._id === id ? updatedRestaurant : r))
      );
      toast.success("Restaurant mis à jour avec succès");
      return updatedRestaurant;
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du restaurant");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteRestaurant = async (id) => {
    try {
      setLoading(true);
      await restaurantService.delete(id);
      setRestaurants(restaurants.filter((r) => r._id !== id));
      toast.success("Restaurant supprimé avec succès");
    } catch (error) {
      toast.error("Erreur lors de la suppression du restaurant");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (restaurantId, reviewData) => {
    try {
      setLoading(true);
      const updatedRestaurant = await reviewService.addReview(
        restaurantId,
        reviewData
      );
      setRestaurants(
        restaurants.map((r) => (r._id === restaurantId ? updatedRestaurant : r))
      );
      toast.success("Avis ajouté avec succès");
    } catch (error) {
      toast.error("Erreur lors de l'ajout de l'avis");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (restaurantId, reviewId) => {
    try {
      setLoading(true);
      await reviewService.deleteReview(restaurantId, reviewId);
      const updatedRestaurants = restaurants.map((restaurant) => {
        if (restaurant._id === restaurantId) {
          return {
            ...restaurant,
            avis: restaurant.avis.filter((avis) => avis._id !== reviewId),
          };
        }
        return restaurant;
      });
      setRestaurants(updatedRestaurants);
      toast.success("Avis supprimé avec succès");
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'avis");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const uploadImages = async (files) => {
    try {
      setLoading(true);
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
      const data = await imageService.uploadImages(formData);
      return data.images;
    } catch (error) {
      toast.error("Erreur lors de l'upload des images");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    restaurants,
    loading,
    fetchRestaurants,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    addReview,
    deleteReview,
    uploadImages,
  };
};

export const useRestaurant = (id) => {
  return useQuery({
    queryKey: ["restaurants", id],
    queryFn: () => fetchWithAuth(`${API_URL}/restaurants/${id}`),
    enabled: !!id,
  });
};

export const useCreateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (restaurantData) => {
      return fetchWithAuth(`${API_URL}/restaurants`, {
        method: "POST",
        body: JSON.stringify(restaurantData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurants"]);
      toast.success("Restaurant créé avec succès");
    },
    onError: (error) => {
      toast.error(error.message || "Une erreur est survenue");
    },
  });
};

export const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      return fetchWithAuth(`${API_URL}/restaurants/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["restaurants"]);
      queryClient.invalidateQueries(["restaurants", variables.id]);
      toast.success("Restaurant mis à jour avec succès");
    },
    onError: (error) => {
      toast.error(error.message || "Une erreur est survenue");
    },
  });
};

export const useDeleteRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await fetchWithAuth(`${API_URL}/restaurants/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurants"]);
      toast.success("Restaurant supprimé avec succès");
    },
    onError: (error) => {
      toast.error(error.message || "Une erreur est survenue");
    },
  });
};
