import { useForm } from "react-hook-form";
import { useRestaurants } from "../../hooks/useRestaurants";
import { Button } from "../common/Button";

export const ReviewForm = ({ restaurantId }) => {
  const { addReview, loading } = useRestaurants();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      await addReview(restaurantId, data);
      reset();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'avis:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Note
        </label>
        <select
          {...register("note", { required: "La note est requise" })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value} étoile{value > 1 ? "s" : ""}
            </option>
          ))}
        </select>
        {errors.note && (
          <p className="mt-1 text-sm text-red-600">{errors.note.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Commentaire
        </label>
        <textarea
          {...register("commentaire", {
            required: "Le commentaire est requis",
            minLength: {
              value: 10,
              message: "Le commentaire doit faire au moins 10 caractères",
            },
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={4}
        />
        {errors.commentaire && (
          <p className="mt-1 text-sm text-red-600">
            {errors.commentaire.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" isLoading={loading}>
        Publier l'avis
      </Button>
    </form>
  );
};
