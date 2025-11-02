import React from 'react'
import { Link } from 'react-router-dom'

const StickyBar = () => {
  const categories = [
    { name: 'Sweets/Chocklates', path: '/categories/Chocolates' },
    { name: 'Biscuits', path: '/categories/Biscuits' },
    { name: 'Ice Creams', path: '/categories/Ice-Creams' },
    { name: 'Cold Drinks', path: '/categories/Cold-Drinks' },
    { name: 'Tea/Coffee', path: '/categories/Beverages' },
    { name: 'Namkeen', path: '/categories/namkeen' },
  ]

  return (
    <div className=" top-[70px] z-40 bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-start gap-6 overflow-x-auto px-4 py-3 scrollbar-hide">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={cat.path}
            className="text-gray-700 font-medium whitespace-nowrap hover:text-blue-600 transition-colors duration-200"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default StickyBar
