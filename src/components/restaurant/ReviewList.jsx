import { useAuth } from "../../hooks/useAuth";
import { Button } from "../common/Button";

export const ReviewList = ({ reviews, onDelete }) => {
  const { user } = useAuth();

  if (!reviews?.length) {
    return (
      <p className="text-gray-500 text-center py-4">
        Aucun avis pour ce restaurant
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-gray-50 p-4 rounded-lg border border-gray-200"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < review.note ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString()}
            </div>
          </div>
          <p className="text-gray-700">{review.commentaire}</p>
          {user?._id === review.userId && (
            <div className="mt-3 flex justify-end">
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(review._id)}
              >
                Supprimer
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
