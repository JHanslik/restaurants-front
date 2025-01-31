import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { LoginForm } from "../components/auth/LoginForm";
import { Card } from "../components/common/Card";

export const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (credentials) => {
    if (loading) return;
    setLoading(true);
    try {
      await login(credentials);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Connexion</h1>
        <LoginForm onSubmit={handleSubmit} isLoading={loading} />
      </Card>
    </div>
  );
};
