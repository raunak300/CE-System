import React from "react";
import { ShoppingCart, MapPin, Search } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#b7d8f7] to-[#e3f2fd] shadow-md py-3 px-6 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-20">
        {/* Logo / Name */}
        <div className="text-2xl font-bold text-[#0f172a] tracking-tight">
          Snackify
        </div>

        {/* Delivering To */}
        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full text-[#1e3a8a] font-medium shadow-sm hover:shadow transition">
          <MapPin size={18} className="text-[#1e3a8a]" />
          <span>Delivering to Delhi</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 w-3/7 shadow-sm focus-within:shadow-md transition">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search for chocolates, ice creams..."
          className="ml-3 w-[80] outline-none bg-transparent text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-[#1e3a8a] font-semibold">Hi, Aryan</div>
        <div className="relative bg-[#1e3a8a] text-white px-3 py-2 rounded-full flex items-center gap-2 hover:bg-[#3b82f6] transition shadow-md">
          <ShoppingCart size={18} />
          <span className="text-sm">Cart</span>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            10
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
