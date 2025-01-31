import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RestaurantForm } from "../components/restaurant/RestaurantForm";
import { Card } from "../components/common/Card";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { useRestaurants } from "../hooks/useRestaurants";

export const EditRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { restaurants, loading, updateRestaurant, fetchRestaurants } =
    useRestaurants();

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const restaurant = restaurants.find((r) => r._id === id);

  const handleSubmit = async (data) => {
    try {
      await updateRestaurant(id, data);
      navigate(`/restaurants/${id}`);
    } catch (error) {
      console.error("Erreur lors de la modification du restaurant:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Restaurant non trouvé</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Modifier le restaurant</h1>
        <RestaurantForm
          onSubmit={handleSubmit}
          isLoading={loading}
          initialData={restaurant}
        />
      </Card>
    </div>
  );
};
