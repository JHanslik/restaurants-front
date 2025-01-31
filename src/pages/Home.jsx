import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRestaurants } from "../hooks/useRestaurants";
import { RestaurantCard } from "../components/restaurant/RestaurantCard";
import { RestaurantFilters } from "../components/restaurant/RestaurantFilters";
import { LoadingSpinner } from "../components/common/LoadingSpinner";

export const Home = () => {
  const navigate = useNavigate();
  const { restaurants, loading, fetchRestaurants } = useRestaurants();
  const [filters, setFilters] = useState({
    search: "",
    cuisine: "",
    note: "",
  });

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const filteredRestaurants = restaurants?.filter((restaurant) => {
    const matchesSearch =
      !filters.search ||
      restaurant.nom.toLowerCase().includes(filters.search.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCuisine =
      !filters.cuisine || restaurant.cuisine === filters.cuisine;

    const matchesNote =
      !filters.note || restaurant.note >= parseInt(filters.note);

    return matchesSearch && matchesCuisine && matchesNote;
  });

  const resetFilters = () => {
    setFilters({
      search: "",
      cuisine: "",
      note: "",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Découvrez nos restaurants
      </h1>

      <RestaurantFilters
        filters={filters}
        onChange={setFilters}
        onReset={resetFilters}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants && filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
              onClick={() => navigate(`/restaurants/${restaurant._id}`)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h2 className="text-xl text-gray-600">
              Aucun restaurant ne correspond à vos critères
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};
