import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BACKEND_URL from "../../baseUrl";
import { useAuthContext } from "../context/AuthUser";

function SignUp() {
  const [role, setRole] = useState("hospital");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    age: "",
  });
  const [hospitalData, setHospitalData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    location: "",
    zipcode: "",
    departments: [{ name: "", head: "" }],
  });

  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const handlePatientInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleHospitalInputChange = (e) => {
    const { name, value } = e.target;
    setHospitalData({ ...hospitalData, [name]: value });
  };

  const handleDepartmentChange = (index, field, value) => {
    const newDepartments = [...hospitalData.departments];
    newDepartments[index][field] = value;
    setHospitalData({ ...hospitalData, departments: newDepartments });
  };

  const addDepartment = () => {
    setHospitalData({
      ...hospitalData,
      departments: [...hospitalData.departments, { name: "", head: "" }],
    });
  };

  const removeDepartment = (index) => {
    const newDepartments = hospitalData.departments.filter(
      (_, i) => i !== index
    );
    setHospitalData({ ...hospitalData, departments: newDepartments });
  };

  const validateForm = () => {
    if (role === "patient") {
      const { name, email, contact, password, age } = patientData;
      if (!name || !email || !contact || !password || !age) {
        setError("All fields are required for patients.");
        return false;
      }
    } else if (role === "hospital") {
      const { name, email, contact, password, location, zipcode, departments } =
        hospitalData;
      if (
        !name ||
        !email ||
        !contact ||
        !password ||
        !location ||
        !zipcode ||
        departments.some((dept) => !dept.name || !dept.head)
      ) {
        setError("All fields are required for hospitals.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setLoading(true); // Show loading state

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const payload =
      role === "patient" ? { role, ...patientData } : { role, ...hospitalData };
    console.log("Form submitted:", payload);
    let finalBackendUrl = "";
    if (role === "patient") {
      finalBackendUrl = `${BACKEND_URL}/patient/register`;
    } else if (role === "hospital") {
      finalBackendUrl = `${BACKEND_URL}/hospital/register`;
    }

    try {
      const response = await axios.post(finalBackendUrl, payload);
      setLoading(false);

      if (response.data) {
        console.log(response);

        // Ensure correct extraction of token
        const token = JSON.stringify(response.data.token);
        console.log(token);
        const finalToken = `Bearer ${token}`;
        // Check if token exists and is a string
        if (typeof token === "string") {
          localStorage.setItem("token", finalToken);
          localStorage.setItem("currentUser", JSON.stringify(response.data));
          setAuthUser(response.data);
          console.log("Registration successful, token:", token);
          navigate("/hospital-dashboard");
        } else {
          console.error("Token is missing or not a string");
          setError("Token is missing or invalid");
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        // API returned an error
        setError(error.response.data.message || "Something went wrong");
      } else {
        // Network or other error
        setError("Unable to complete the request. Please try again later.");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Hotel Registration
      </h2>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {role === "patient" ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Full Name:
                <input
                  type="text"
                  name="name"
                  value={patientData.name}
                  onChange={handlePatientInputChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email:
                <input
                  type="email"
                  name="email"
                  value={patientData.email}
                  onChange={handlePatientInputChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Contact:
                <input
                  type="tel"
                  name="contact"
                  value={patientData.contact}
                  onChange={handlePatientInputChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password:
                <input
                  type="password"
                  name="password"
                  value={patientData.password}
                  onChange={handlePatientInputChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Age:
                <input
                  type="number"
                  name="age"
                  value={patientData.age}
                  onChange={handlePatientInputChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Hotel Name:
                <input
                  type="text"
                  name="name"
                  value={hospitalData.name}
                  onChange={handleHospitalInputChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email:
                <input
                  type="email"
                  name="email"
                  value={hospitalData.email}
                  onChange={handleHospitalInputChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Contact:
                <input
                  type="tel"
                  name="contact"
                  value={hospitalData.contact}
                  onChange={handleHospitalInputChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password:
                <input
                  type="password"
                  name="password"
                  value={hospitalData.password}
                  onChange={handleHospitalInputChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Location:
                <input
                  type="text"
                  name="location"
                  value={hospitalData.location}
                  onChange={handleHospitalInputChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Zipcode:
                <input
                  type="text"
                  name="zipcode"
                  value={hospitalData.zipcode}
                  onChange={handleHospitalInputChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Departments:
              </label>
              {hospitalData.departments.map((dept, index) => (
                <div key={index} className="flex flex-wrap mb-2">
                  <input
                    type="text"
                    placeholder="Department Name"
                    value={dept.name}
                    onChange={(e) =>
                      handleDepartmentChange(index, "name", e.target.value)
                    }
                    className="flex-1 p-2 border rounded-md mr-2 mb-2 sm:mb-0"
                  />
                  <input
                    type="text"
                    placeholder="Department Head"
                    value={dept.head}
                    onChange={(e) =>
                      handleDepartmentChange(index, "head", e.target.value)
                    }
                    className="flex-1 p-2 border rounded-md mr-2 mb-2 sm:mb-0"
                  />
                  <button
                    type="button"
                    onClick={() => removeDepartment(index)}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addDepartment}
                className="bg-green-500 text-white p-2 rounded-md mt-2 hover:bg-green-600 transition-colors"
              >
                Add Department
              </button>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-bold py-2 px-4 rounded transition-colors`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
