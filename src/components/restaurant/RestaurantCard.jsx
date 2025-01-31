import { useRestaurants } from "../../hooks/useRestaurants";
import { useAuth } from "../../hooks/useAuth";
import { Card } from "../common/Card";
import { Button } from "../common/Button";

export const RestaurantCard = ({ restaurant, onClick }) => {
  const { user } = useAuth();
  const { deleteRestaurant } = useRestaurants();
  const { nom, cuisine, adresse, note, images, userId } = restaurant;

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce restaurant ?")) {
      await deleteRestaurant(restaurant._id);
    }
  };

  return (
    <Card
      hoverable
      className="flex flex-col h-full"
      onClick={() => onClick?.(restaurant)}
    >
      {images?.[0] && (
        <div className="relative h-48 -mx-6 -mt-6 mb-4">
          <img
            src={images[0].url}
            alt={nom}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
      )}

      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2">{nom}</h3>
        <p className="text-gray-600 mb-2">{cuisine}</p>
        <p className="text-gray-500 text-sm mb-4">
          {adresse.ville}, {adresse.codePostal}
        </p>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-xl ${
                i < note ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {user?._id === userId && (
        <div className="flex gap-2 mt-4 pt-4 border-t">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.(restaurant);
            }}
          >
            Modifier
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            Supprimer
          </Button>
        </div>
      )}
    </Card>
  );
};
