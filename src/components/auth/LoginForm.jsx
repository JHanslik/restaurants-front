import { useForm } from "react-hook-form";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

export const LoginForm = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Se connecter
      </Button>
    </form>
  );
};
