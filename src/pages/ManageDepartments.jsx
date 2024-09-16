import { useState } from "react";

function ManageDepartments() {
  const [departments, setDepartments] = useState([
    { id: 1, name: "Cardiology", head: "Dr. Smith" },
    { id: 2, name: "Neurology", head: "Dr. Johnson" },
    { id: 3, name: "Orthopedics", head: "Dr. Williams" },
  ]);

  const [newDepartment, setNewDepartment] = useState({ name: "", head: "" });

  const handleAddDepartment = (e) => {
    e.preventDefault();
    setDepartments([...departments, { id: Date.now(), ...newDepartment }]);
    setNewDepartment({ name: "", head: "" });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-green-600 mb-8">
        Manage Departments
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {departments.map((department) => (
          <div
            key={department.id}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-bold text-green-600 mb-2">
              {department.name}
            </h3>
            <p className="text-gray-600 mb-4">Head: {department.head}</p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
              Edit
            </button>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-green-600 mb-4">
          Add New Department
        </h3>
        <form onSubmit={handleAddDepartment}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Department Name:
            </label>
            <input
              type="text"
              id="name"
              value={newDepartment.name}
              onChange={(e) =>
                setNewDepartment({ ...newDepartment, name: e.target.value })
              }
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="head"
            >
              Department Head:
            </label>
            <input
              type="text"
              id="head"
              value={newDepartment.head}
              onChange={(e) =>
                setNewDepartment({ ...newDepartment, head: e.target.value })
              }
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
}

export default ManageDepartments;
