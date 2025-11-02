import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  // Individual useState hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [areaPin, setAreaPin] = useState("");

  const handleSignup = () => {
    const userData = { name, email, password, address, areaPin };
    console.log("User Signup Data:", userData);
    // TODO: handle signup logic (API call or validation)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f8fafc] to-[#e3f2fd]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[90%] max-w-md">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-[#1e3a8a] mb-6">
          User Signup
        </h2>

        {/* Input Fields */}
        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Area Pin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area Pin
            </label>
            <input
              type="text"
              value={areaPin}
              onChange={(e) => setAreaPin(e.target.value)}
              placeholder="Enter your area pin code"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg 
                       font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md"
          >
            Signup
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already a user?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
