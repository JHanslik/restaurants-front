const API_URL = "http://localhost:5000/api";

export const authService = {
  async login(credentials) {
    try {
      console.log("🚀 Tentative de connexion avec:", credentials);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      console.log("📡 Statut de la réponse:", response.status);
      console.log(
        "📡 Headers:",
        Object.fromEntries(response.headers.entries())
      );

      const data = await response.json();
      console.log("📦 Données reçues:", data);

      if (!response.ok) {
        console.error("❌ Erreur de réponse:", {
          status: response.status,
          statusText: response.statusText,
          data,
        });
        throw new Error(data.message || "Erreur lors de la connexion");
      }

      if (!data.token || !data.user) {
        console.error("❌ Données invalides:", data);
        throw new Error("Réponse du serveur invalide");
      }

      console.log("✅ Connexion réussie:", {
        user: data.user,
        tokenPresent: !!data.token,
      });

      return data;
    } catch (error) {
      console.error("🔥 Erreur complète:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      throw error;
    }
  },

  async register(userData) {
    try {
      console.log("Tentative d'inscription avec:", userData);

      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("Réponse du serveur:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Erreur ${response.status}: ${
              data.error || "Erreur lors de l'inscription"
            }`
        );
      }

      if (!data.token || !data.user) {
        throw new Error("Réponse du serveur invalide: token ou user manquant");
      }

      return data;
    } catch (error) {
      console.error("Détails de l'erreur:", error);
      throw error;
    }
  },

  async verifyToken(token) {
    const response = await fetch(`${API_URL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Token invalide");
    }

    return response.json();
  },

  setAuthHeader(token) {
    if (token) {
      fetch(`${API_URL}/auth/set-header`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      fetch(`${API_URL}/auth/clear-header`, {
        method: "POST",
      });
    }
  },
};
