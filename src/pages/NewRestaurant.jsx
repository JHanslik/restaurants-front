import { useNavigate } from "react-router-dom";
import { RestaurantForm } from "../components/restaurant/RestaurantForm";
import { Card } from "../components/common/Card";
import { useRestaurants } from "../hooks/useRestaurants";

export const NewRestaurant = () => {
  const navigate = useNavigate();
  const { addRestaurant, loading } = useRestaurants();

  const handleSubmit = async (data) => {
    try {
      const newRestaurant = await addRestaurant(data);
      navigate(`/restaurants/${newRestaurant._id}`);
    } catch (error) {
      console.error("Erreur lors de l'ajout du restaurant:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Ajouter un restaurant</h1>
        <RestaurantForm onSubmit={handleSubmit} isLoading={loading} />
      </Card>
    </div>
  );
};
