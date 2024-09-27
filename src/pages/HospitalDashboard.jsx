import { Link } from "react-router-dom";

function HospitalDashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-green-600 mb-8">
        Hotel Dashboard
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/manage-departments"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-bold text-green-600 mb-2">
            Manage Departments
          </h3>
          <p className="text-gray-600">
            Add, edit, or remove hotel departments
          </p>
        </Link>
        <Link
          to="/manage-appointments"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-bold text-green-600 mb-2">
            Manage Appointments
          </h3>
          <p className="text-gray-600">View and handle travellers appointments</p>
        </Link>
        <Link
          to="/inventory-management"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-bold text-green-600 mb-2">
            Inventory Management
          </h3>
          <p className="text-gray-600">Track and manage supplies</p>
        </Link>
        <Link
          to="/bed-management"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-bold text-green-600 mb-2">
            Room Management
          </h3>
          <p className="text-gray-600">Monitor and assign hotel rooms</p>
        </Link>
      </div>
    </div>
  );
}

export default HospitalDashboard;
