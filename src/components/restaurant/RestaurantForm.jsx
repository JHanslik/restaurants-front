import { useForm } from "react-hook-form";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

export const RestaurantForm = ({ onSubmit, isLoading, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      nom: "",
      cuisine: "",
      adresse: {
        rue: "",
        ville: "",
        codePostal: "",
      },
      telephone: "",
      description: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Nom du restaurant"
        {...register("nom", { required: "Le nom est requis" })}
        error={errors.nom?.message}
      />

      <Input
        label="Type de cuisine"
        {...register("cuisine", { required: "Le type de cuisine est requis" })}
        error={errors.cuisine?.message}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Adresse</h3>
        <Input
          label="Rue"
          {...register("adresse.rue", { required: "La rue est requise" })}
          error={errors.adresse?.rue?.message}
        />
        <Input
          label="Ville"
          {...register("adresse.ville", { required: "La ville est requise" })}
          error={errors.adresse?.ville?.message}
        />
        <Input
          label="Code postal"
          {...register("adresse.codePostal", {
            required: "Le code postal est requis",
          })}
          error={errors.adresse?.codePostal?.message}
        />
      </div>

      <Input
        label="Téléphone"
        type="tel"
        {...register("telephone")}
        error={errors.telephone?.message}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          {...register("description")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full" isLoading={isLoading}>
        {initialData ? "Modifier" : "Ajouter"} le restaurant
      </Button>
    </form>
  );
};
