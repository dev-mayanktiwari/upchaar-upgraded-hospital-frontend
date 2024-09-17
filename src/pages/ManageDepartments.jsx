import { useEffect, useState } from "react";
import axios from "axios";

function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState([{ name: "", head: "" }]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { token } = JSON.parse(localStorage.getItem("currentUser"));
        const response = await axios.get(
          "http://localhost:3000/api/v1/hospital/departments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDepartments(response.data);
      } catch (err) {
        console.log("Error fetching departments", err);
      }
    };
    fetchDepartments();
  }, [newDepartment]);

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    try {
      const { token } = JSON.parse(localStorage.getItem("currentUser"));
      // Send the newDepartment array to the backend
      await axios.post(
        "http://localhost:3000/api/v1/hospital/add-departments",
        { departments: newDepartment }, // Sending array of departments
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewDepartment([{ name: "", head: "" }]); // Reset after adding
    } catch (err) {
      console.log("Error adding departments", err);
    }
  };

  const handleDepartmentChange = (index, field, value) => {
    const updatedDepartments = [...newDepartment];
    updatedDepartments[index][field] = value;
    setNewDepartment(updatedDepartments);
  };

  const addNewDepartmentField = () => {
    setNewDepartment([...newDepartment, { name: "", head: "" }]);
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
          Add New Departments
        </h3>
        <form onSubmit={handleAddDepartment}>
          {newDepartment.map((dept, index) => (
            <div key={index} className="mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`name-${index}`}
                >
                  Department Name:
                </label>
                <input
                  type="text"
                  id={`name-${index}`}
                  value={dept.name}
                  onChange={(e) =>
                    handleDepartmentChange(index, "name", e.target.value)
                  }
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`head-${index}`}
                >
                  Department Head:
                </label>
                <input
                  type="text"
                  id={`head-${index}`}
                  value={dept.head}
                  onChange={(e) =>
                    handleDepartmentChange(index, "head", e.target.value)
                  }
                  required
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addNewDepartmentField}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Add Another Department
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Departments
          </button>
        </form>
      </div>
    </div>
  );
}

export default ManageDepartments;
