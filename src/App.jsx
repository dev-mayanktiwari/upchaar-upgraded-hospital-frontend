import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";

import HospitalDashboard from "./pages/HospitalDashboard";

import ManageDepartments from "./pages/ManageDepartments";

import InventoryManagement from "./pages/InventoryManagement";

import SignIn from "./pages/SignIn";

import { useAuthContext } from "./context/AuthUser";
import ManageAppointments from "./pages/ManageAppointments";
import BedManagement from "./pages/BedManagement";

function App() {
  const { authUser } = useAuthContext();
  // console.log(authUser);
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 mb-20">
          <Routes>
            <Route
              path="/"
              element={authUser ? <HospitalDashboard /> : <Home />}
            />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/hospital-dashboard" element={<HospitalDashboard />} />

            <Route path="/manage-departments" element={<ManageDepartments />} />
            <Route path="/signin" element={<SignIn />} />

            <Route
              path="/inventory-management"
              element={<InventoryManagement />}
            />
            <Route
              path="/manage-appointments"
              element={<ManageAppointments />}
            />
            <Route path="/bed-management" element={<BedManagement />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
