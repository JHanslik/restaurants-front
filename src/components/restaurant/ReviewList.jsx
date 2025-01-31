import { useAuth } from "../../hooks/useAuth";
import { Button } from "../common/Button";

export const ReviewList = ({ reviews = [], onDelete }) => {
  const { user } = useAuth();

  if (!reviews?.length) {
    return (
      <p className="text-gray-500 text-center py-4">
        Aucun avis pour ce restaurant
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-gray-50 p-4 rounded-lg border border-gray-200"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < review.note ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            {user && user._id === review.userId && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(review._id)}
              >
                Supprimer
              </Button>
            )}
          </div>
          <p className="text-gray-700">{review.commentaire}</p>
        </div>
      ))}
    </div>
  );
};
