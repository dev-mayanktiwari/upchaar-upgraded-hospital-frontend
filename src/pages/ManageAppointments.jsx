import axios from "axios";
import { useEffect, useState } from "react";

function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { token } = JSON.parse(localStorage.getItem("currentUser"));
        const response = await axios.get(
          "http://localhost:3000/api/v1/hospital/appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(response.data);
      } catch (err) {
        console.log("Error fetching appointments", err);
      }
    };
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("currentUser"));
      // Send the request to update status
      await axios.patch(
        `http://localhost:3000/api/v1/hospital/appointments/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the local state after successful request
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === id
            ? { ...appointment, appointmentStatus: newStatus }
            : appointment
        )
      );
      alert("Appointment status changed successfully");
    } catch (err) {
      console.log("Error updating appointment status", err);
    }
  };

  // Function to format the date and time
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString(); // Format to "MM/DD/YYYY, HH:MM:SS"
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-green-600 mb-8">
        Manage Appointments
      </h2>
      <div className="grid gap-6">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-bold text-green-600 mb-2">
              {appointment.patient.name}
            </h3>
            <p className="text-gray-600 mb-1">
              Department: {appointment.department.name}
            </p>
            <p className="text-gray-600 mb-1">
              Date & Time: {formatDateTime(appointment.time)}
            </p>
            <div className="flex items-center">
              <label
                className="mr-2 text-gray-700 font-bold"
                htmlFor={`status-${appointment.id}`}
              >
                Status:
              </label>
              <select
                id={`status-${appointment.id}`}
                value={appointment.appointmentStatus}
                onChange={(e) =>
                  handleStatusChange(appointment.id, e.target.value)
                }
                className="p-2 border rounded-md"
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageAppointments;
