import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../API/authAPI";
import axios from 'axios'
import userStore from "../../Store/store";

const Login = () => {
  const [activeTab, setActiveTab] = useState("user");
  const navigate=useNavigate()
  const setuserData=userStore((state)=>state.setuserData)
  // Individual useStates for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setLoggedIn = userStore((state) => state.setLoggedIn)
  const setLoggedOut = userStore((state) => state.setLoggedOut)

  const handleSubmit = async(e) => {
    e.preventDefault();
    const loginData = { role: activeTab, email, password };
    try {
      const response= await axios.post(LOGIN_URL,loginData,{withCredentials:true})
      if(response.status===200){
        navigate('/')
        setuserData(response.data.data);
        setLoggedIn()
      }
    } catch (error) {
      setLoggedOut()
      alert(error)
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f8fafc] to-[#e3f2fd]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[90%] max-w-md">
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setActiveTab("user")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "user"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            User
          </button>
          <button
            onClick={() => setActiveTab("admin")}
            className={`ml-4 px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "admin"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-[#1e3a8a] mb-6">
          {activeTab === "user" ? "User Login" : "Admin Login"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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

          {/* Login Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg 
                       font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Not a user?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
