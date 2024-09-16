import { useState } from "react";

function ManageAppointments() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      department: "Cardiology",
      date: "2023-06-15",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      department: "Neurology",
      date: "2023-06-20",
      time: "2:30 PM",
      status: "Pending",
    },
    {
      id: 3,
      patientName: "Mike Johnson",
      department: "Orthopedics",
      date: "2023-06-25",
      time: "11:15 AM",
      status: "Completed",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
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
              {appointment.patientName}
            </h3>
            <p className="text-gray-600 mb-1">
              Department: {appointment.department}
            </p>
            <p className="text-gray-600 mb-1">Date: {appointment.date}</p>
            <p className="text-gray-600 mb-4">Time: {appointment.time}</p>
            <div className="flex items-center">
              <label
                className="mr-2 text-gray-700 font-bold"
                htmlFor={`status-${appointment.id}`}
              >
                Status:
              </label>
              <select
                id={`status-${appointment.id}`}
                value={appointment.status}
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
