// src/components/Header.js

import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          TourEase
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-blue-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-blue-200">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/patient-dashboard" className="hover:text-blue-200">
                Traveller
              </Link>
            </li>
            <li>
              <Link to="/hospital-dashboard" className="hover:text-blue-200">
                Hotels
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
