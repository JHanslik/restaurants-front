import { Input } from "../common/Input";
import { Button } from "../common/Button";

export const RestaurantFilters = ({ filters, onChange, onReset }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Rechercher un restaurant..."
          name="search"
          value={filters.search || ""}
          onChange={handleChange}
        />

        <select
          name="cuisine"
          value={filters.cuisine || ""}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Toutes les cuisines</option>
          <option value="française">Française</option>
          <option value="italienne">Italienne</option>
          <option value="japonaise">Japonaise</option>
          <option value="mexicaine">Mexicaine</option>
        </select>

        <select
          name="note"
          value={filters.note || ""}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Toutes les notes</option>
          <option value="5">5 étoiles</option>
          <option value="4">4 étoiles et plus</option>
          <option value="3">3 étoiles et plus</option>
        </select>
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant="secondary" size="sm" onClick={onReset}>
          Réinitialiser les filtres
        </Button>
      </div>
    </div>
  );
};
