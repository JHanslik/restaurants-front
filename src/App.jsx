import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { RestaurantProvider } from "./context/RestaurantContext";
import { Navbar } from "./components/layout/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { RestaurantDetail } from "./pages/RestaurantDetail";
import { NewRestaurant } from "./pages/NewRestaurant";
import { EditRestaurant } from "./pages/EditRestaurant";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <RestaurantProvider>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/restaurants/:id"
                    element={<RestaurantDetail />}
                  />
                  <Route
                    path="/restaurants/new"
                    element={
                      <ProtectedRoute>
                        <NewRestaurant />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/restaurants/:id/edit"
                    element={
                      <ProtectedRoute>
                        <EditRestaurant />
                      </ProtectedRoute>
                    }
                  />
                  {/* Autres routes à ajouter */}
                </Routes>
              </main>
              <Toaster position="top-right" />
            </div>
          </RestaurantProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
