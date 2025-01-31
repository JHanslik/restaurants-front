import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRestaurants } from "../hooks/useRestaurants";
import { useAuth } from "../hooks/useAuth";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ReviewForm } from "../components/restaurant/ReviewForm";
import { ReviewList } from "../components/restaurant/ReviewList";
import { ImageUploader } from "../components/restaurant/ImageUploader";
import { toast } from "react-hot-toast";
import { imageService } from "../services/imageService";

export const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    restaurants,
    loading,
    fetchRestaurants,
    deleteRestaurant,
    addReview,
    deleteReview,
    uploadImages,
  } = useRestaurants();

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const restaurant = restaurants.find((r) => r._id === id);

  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce restaurant ?")) {
      await deleteRestaurant(id);
      navigate("/");
    }
  };

  const handleAddReview = async (data) => {
    try {
      await addReview(id, data);
      await fetchRestaurants();
      toast.success("Avis ajouté avec succès");
    } catch (error) {
      toast.error("Erreur lors de l'ajout de l'avis");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(id, reviewId);
      await fetchRestaurants();
      toast.success("Avis supprimé avec succès");
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'avis");
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
      <Card className="max-w-4xl mx-auto">
        {restaurant.images?.[0] && (
          <div className="relative h-64 -mx-6 -mt-6 mb-6">
            <img
              src={restaurant.images[0].url}
              alt={restaurant.nom}
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>
        )}

        <h1 className="text-3xl font-bold mb-4">{restaurant.nom}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Informations</h2>
            <p className="text-gray-600">Cuisine: {restaurant.cuisine}</p>
            <p className="text-gray-600">
              Adresse: {restaurant.adresse.rue}, {restaurant.adresse.ville}{" "}
              {restaurant.adresse.codePostal}
            </p>
            <p className="text-gray-600">Téléphone: {restaurant.telephone}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Note moyenne</h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < (restaurant.noteMoyenne || 0)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-600">
                {restaurant.noteMoyenne
                  ? `(${restaurant.noteMoyenne.toFixed(1)}/5 - ${
                      restaurant.nombreAvis || 0
                    } avis)`
                  : "Aucun avis"}
              </span>
            </div>
          </div>
        </div>

        {restaurant.description && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{restaurant.description}</p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t">
          <h2 className="text-2xl font-semibold mb-6">Avis</h2>

          {user && (
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Ajouter un avis</h3>
              <ReviewForm
                onSubmit={handleAddReview}
                isLoading={loading}
                restaurantId={id}
              />
            </div>
          )}

          <ReviewList
            reviews={restaurant.avis}
            onDelete={(reviewId) => deleteReview(id, reviewId)}
          />
        </div>

        {user && user._id === restaurant.userId && (
          <>
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-medium mb-4">Gérer les images</h3>
              <ImageUploader
                onImagesSelected={async (files) => {
                  try {
                    const formData = new FormData();
                    files.forEach((file) => formData.append("images", file));

                    await imageService.uploadImages(id, formData);
                    await fetchRestaurants();
                    toast.success("Images ajoutées avec succès");
                  } catch (error) {
                    console.error(error);
                    toast.error("Erreur lors de l'ajout des images");
                  }
                }}
              />
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t">
              <Button
                variant="secondary"
                onClick={() => navigate(`/restaurants/${id}/edit`)}
              >
                Modifier
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Supprimer
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};
