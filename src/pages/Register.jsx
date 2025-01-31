import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/auth/RegisterForm";
import { Card } from "../components/common/Card";
import { toast } from "react-hot-toast";
import { authService } from "../services/auth";

export const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await authService.register(data);
      toast.success(
        "Inscription réussie ! Vous pouvez maintenant vous connecter."
      );
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Inscription</h1>
        <RegisterForm onSubmit={handleSubmit} isLoading={loading} />
      </Card>
    </div>
  );
};
