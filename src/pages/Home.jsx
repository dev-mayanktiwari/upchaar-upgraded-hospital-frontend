import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const heroImages = ["/travel1.jpeg", "/travel2.jpg", "/travel3.avif"];

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {heroImages.map((image, index) => (
          <motion.img
            key={image}
            src={image}
            alt={`Healthcare ${index + 1}`}
            className="absolute w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
            transition={{ duration: 1 }}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to TourEase!!
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Simplifying travel bookings and managing itineraries with ease.
            <br />
            Enjoy a smooth travel experience by easily coordinating hotel stays,
            <br />
            exploring tourist destinations, and handling your trip plans all in
            one place.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Up
            </Link>
            <Link
              to="/view-hospitals"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              View Hotels
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-12">
            Our Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
              title="For Travellers"
              color="blue"
              features={[
                "Easy hotel and attraction booking",
                "Access to travel itineraries",
                "Real-time booking status updates",
                "Trip planning and reminders",
                "Virtual tour consultations",
                "Travel insights and recommendations",
              ]}
            />
            <FeatureCard
              title="For Hotels"
              color="green"
              features={[
                "Efficient room and service management",
                "Streamlined guest check-in and booking",
                "Advanced inventory and amenity control",
                "Real-time room availability management",
                "Staff scheduling and task management",
                "Analytics and reporting dashboard for occupancy and performance",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-200 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="TourEase has transformed my travel experience. Booking hotels and planning trips has never been easier!"
              author="Jane Smith, Traveler"
            />
            <TestimonialCard
              quote="As a hotel manager, this platform has greatly enhanced our operations and guest satisfaction."
              author="Mr. Alex Johnson, Hotel Manager"
            />
            <TestimonialCard
              quote="The travel reminders have been a game-changer. I never miss a booking or activity now."
              author="Emily Davis, Traveler"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8">
            Join TourEase today and experience the future of travel management.
          </p>
          <Link
            to="/signup"
            className="bg-white text-blue-600 hover:bg-blue-100 font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, color, features }) {
  return (
    <div
      className={`bg-white p-8 rounded-lg shadow-md border-t-4 border-${color}-600`}
    >
      <h3 className={`text-2xl font-bold text-${color}-600 mb-4`}>{title}</h3>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className={`w-6 h-6 text-${color}-600 mr-2 flex-shrink-0`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TestimonialCard({ quote, author }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-600 mb-4">{quote}</p>
      <p className="font-bold text-blue-600">{author}</p>
    </div>
  );
}

export default Home;
