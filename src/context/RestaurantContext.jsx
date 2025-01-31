import { createContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRestaurants } from "../hooks/useRestaurants";

export const RestaurantContext = createContext({
  restaurants: [],
  loading: false,
  error: null,
  fetchRestaurants: () => {},
  addRestaurant: () => {},
  updateRestaurant: () => {},
  deleteRestaurant: () => {},
  addReview: () => {},
  deleteReview: () => {},
  uploadImages: () => {},
});

export const RestaurantProvider = ({ children }) => {
  const restaurantsData = useRestaurants();
  const { fetchRestaurants } = restaurantsData;

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const {
    restaurants,
    loading,
    error,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    addReview,
    uploadImages,
  } = restaurantsData;

  const value = {
    restaurants,
    loading,
    error,
    fetchRestaurants,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    addReview,
    uploadImages,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};
