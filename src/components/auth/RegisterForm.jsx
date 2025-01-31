import { useForm } from "react-hook-form";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

export const RegisterForm = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Nom"
        {...register("nom", {
          required: "Le nom est requis",
          minLength: {
            value: 2,
            message: "Le nom doit contenir au moins 2 caractères",
          },
        })}
        error={errors.nom?.message}
      />

      <Input
        label="Prénom"
        {...register("prenom", {
          required: "Le prénom est requis",
          minLength: {
            value: 2,
            message: "Le prénom doit contenir au moins 2 caractères",
          },
        })}
        error={errors.prenom?.message}
      />

      <Input
        label="Email"
        type="email"
        {...register("email", {
          required: "L'email est requis",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email invalide",
          },
        })}
        error={errors.email?.message}
      />

      <Input
        label="Mot de passe"
        type="password"
        {...register("password", {
          required: "Le mot de passe est requis",
          minLength: {
            value: 6,
            message: "Le mot de passe doit contenir au moins 6 caractères",
          },
        })}
        error={errors.password?.message}
      />

      <Input
        label="Confirmer le mot de passe"
        type="password"
        {...register("confirmPassword", {
          required: "Veuillez confirmer votre mot de passe",
          validate: (value) =>
            value === password || "Les mots de passe ne correspondent pas",
        })}
        error={errors.confirmPassword?.message}
      />

      <Button type="submit" className="w-full" isLoading={isLoading}>
        S'inscrire
      </Button>
    </form>
  );
};
