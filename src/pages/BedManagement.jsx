import { useState } from "react";

function BedManagement() {
  const [beds, setBeds] = useState([
    { id: 1, number: "101", department: "General Ward", status: "Occupied" },
    { id: 2, number: "102", department: "General Ward", status: "Available" },
    { id: 3, number: "201", department: "ICU", status: "Occupied" },
    { id: 4, number: "202", department: "ICU", status: "Available" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setBeds(
      beds.map((bed) => (bed.id === id ? { ...bed, status: newStatus } : bed))
    );
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-green-600 mb-8">Bed Management</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beds.map((bed) => (
          <div
            key={bed.id}
            className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${
              bed.status === "Available"
                ? "border-green-500"
                : bed.status === "Occupied"
                ? "border-red-500"
                : "border-yellow-500"
            }`}
          >
            <h3 className="text-xl font-bold text-green-600 mb-2">
              Bed {bed.number}
            </h3>
            <p className="text-gray-600 mb-2">Department: {bed.department}</p>
            <div className="flex items-center">
              <label
                className="mr-2 text-gray-700 font-bold"
                htmlFor={`status-${bed.id}`}
              >
                Status:
              </label>
              <select
                id={`status-${bed.id}`}
                value={bed.status}
                onChange={(e) => handleStatusChange(bed.id, e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BedManagement;
