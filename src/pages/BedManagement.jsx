import { useState, useEffect } from "react";
import axios from "axios";

function BedManagement() {
  const [bedCounts, setBedCounts] = useState({
    totalICU: "",
    availableICU: "",
    totalGeneral: "",
    availableGeneral: "",
    totalPremium: "",
    availablePremium: "",
  });

  const [totalBeds, setTotalBeds] = useState(0);
  const [totalAvailable, setTotalAvailable] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const newTotalBeds = sumValues([
      bedCounts.totalICU,
      bedCounts.totalGeneral,
      bedCounts.totalPremium,
    ]);
    const newTotalAvailable = sumValues([
      bedCounts.availableICU,
      bedCounts.availableGeneral,
      bedCounts.availablePremium,
    ]);
    setTotalBeds(newTotalBeds);
    setTotalAvailable(newTotalAvailable);
  }, [bedCounts]);

  const sumValues = (values) => {
    return values.reduce((sum, value) => sum + (parseInt(value) || 0), 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value === "" || /^\d+$/.test(value)) {
      setBedCounts((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage("");

    const payload = Object.fromEntries(
      Object.entries(bedCounts).map(([key, value]) => [
        key,
        parseInt(value) || 0,
      ])
    );

    try {
      const { token } = JSON.parse(localStorage.getItem("currentUser"));
      await axios.post(
        "http://localhost:3000/api/v1/hospital/update-bed-details",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Bed details updated successfully!");
    } catch (error) {
      setError("Failed to update bed details. Please try again.");
      console.error("Error updating bed details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const BedTypeInput = ({ label, total, available }) => (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-green-600 mb-3">{label}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Rooms
          </label>
          <input
            type="text"
            inputMode="numeric"
            name={`total${label.replace(" ", "")}`}
            value={bedCounts[`total${label.replace(" ", "")}`]}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-right rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Available Rooms
          </label>
          <input
            type="text"
            inputMode="numeric"
            name={`available${label.replace(" ", "")}`}
            value={bedCounts[`available${label.replace(" ", "")}`]}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-right rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-green-600 mb-8">Room Management</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <BedTypeInput label="Standard" />
        <BedTypeInput label="Deluxe" />
        <BedTypeInput label="Suite" />

        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-green-600 mb-4">Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 font-medium">Total Rooms:</p>
              <p className="text-2xl font-bold text-green-600">{totalBeds}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Available Rooms:</p>
              <p className="text-2xl font-bold text-green-600">
                {totalAvailable}
              </p>
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          {isLoading ? "Updating..." : "Update Room Details"}
        </button>
      </form>
    </div>
  );
}

export default BedManagement;
