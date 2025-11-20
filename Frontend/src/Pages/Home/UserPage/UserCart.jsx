import React, { useEffect, useState } from "react";
import Navbar from '../../../Componets/Navbar/Navbar'
import axios from "axios";
import { USER_ITEM } from "../../../API/cartAPI";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import userStore from "../../../Store/store"
import StickyBar from "../../../Componets/StickeyBar/StickyBar";

const UserCart = () => {
  const { category_name } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const addToCart = userStore((s) => s.addToCart);
  const decrementFromCart = userStore((s) => s.decrementFromCart);
  const cart = userStore((s) => s.userData.cart);

  // Fetch data
  useEffect(() => {
    const loadItems = async () => {
      try {
        const res = await axios.get(`${USER_ITEM}/categories/${category_name}`, {withCredentials: true});
        setItems(res.data.items || []);
      } catch (err) {
        console.log("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [category_name]);

  const getQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex flex-col items-center py-10">
      <Navbar />
      <StickyBar />

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 w-full max-w-6xl mt-10">
        {items.map((item, idx) => (
          <motion.div
            key={item.id || idx}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-5 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={item.img}
              alt={item.name}
              className="rounded-xl w-full h-48 object-cover"
            />

            <h3 className="text-lg font-semibold text-[#1e3a8a] mt-4 text-center">
              {item.name}
            </h3>

            {/* Cart Controls */}
            <div className="flex items-center gap-4 mt-5">
              <button
                onClick={() => decrementFromCart(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow"
              >
                <FaMinus />
              </button>

              <span className="text-xl font-semibold">
                {getQuantity(item.id)}
              </span>

              <button
                onClick={() => addToCart(item)}
                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow"
              >
                <FaPlus />
              </button>
            </div>

            {/* Navigate Button */}
            <button
              className="mt-5 bg-[#1e3a8a] text-white px-6 py-2 rounded-full hover:bg-[#3b82f6] transition-all duration-300"
              onClick={() =>
                navigate(
                  `/category/${item.name
                    .toLowerCase()
                    .replace(/ & /g, "-")
                    .replace(/\s+/g, "_")}`
                )
              }
            >
              View More
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserCart;
