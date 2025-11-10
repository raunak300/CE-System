import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Package } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AdminCart = () => {
    const navigate=useNavigate()
  const category = [
    {
      name: "Sweets & Chocolates",
      img: "https://cdn.zeptonow.com/production/tr:w-210,ar-300-444,pr-true,f-auto,q-80/cms/category/ec7b14c6-2640-4165-b3ae-68c09a249ae0.png",
    },
    {
      name: "Ice Creams",
      img: "https://cdn.zeptonow.com/production/tr:w-210,ar-225-334,pr-true,f-auto,q-80/cms/category/db346f5e-644f-426a-85af-92d707e086ac.png",
    },
    {
      name: "Cold Drinks",
      img: "https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/59d2c0cc-e776-407c-9142-7e69898d9eab.png",
    },
    {
      name: "Biscuits",
      img: "https://cdn.zeptonow.com/production/tr:w-210,ar-226-334,pr-true,f-auto,q-80/cms/category/9b88fff5-73f5-46fd-999f-1622db4203d7.png",
    },
    {
      name: "Tea & Coffee",
      img: "https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/f078a8dc-a9b6-41a6-9c6f-721d4892b8ee.png",
    },
    {
      name: "Namkeen",
      img: "https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/90b2faee-1461-465a-a8c6-8c84716dd7dc.png",
    },
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex flex-col items-center py-10">
      
      {/* Header Section */}
      <motion.div 
        className="flex flex-col items-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 text-[#1e3a8a]">
          <Package className="w-8 h-8" />
          <h2 className="text-3xl font-bold">Admin Cart Setup</h2>
        </div>
        <p className="text-gray-600 mt-2 text-center max-w-md">
          Select a product category to manage inventory or add new items.
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 w-full max-w-6xl">
        {category.map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out p-5 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={item.img}
              alt={item.name}
              className="rounded-xl w-full h-full object-cover"
            />
            <h3 className="text-lg font-semibold text-[#1e3a8a] mt-4 text-center">
              {item.name}
            </h3>
            <button
              className="mt-5 bg-[#1e3a8a] text-white flex items-center gap-2 px-5 py-2 rounded-full hover:bg-[#3b82f6] transition-all duration-300"
              onClick={()=>navigate(`/category/${item.name.toLowerCase().replace(/ & /g,'-').replace(/\s+/g,'_') }`)}
            >
              <ShoppingCart size={18} />
              Select
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default AdminCart
