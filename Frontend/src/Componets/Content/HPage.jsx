import React, { useEffect, useState } from "react";

const HPage = () => {
  const [showData, setShowData] = useState([]);

  useEffect(() => {
    const data = [
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
    ];
    setShowData(data);
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfaf6] flex flex-col items-center py-10">
      {/* Optional banner / hero section */}
     <div className="w-full max-w-6xl mb-10 rounded-xl overflow-hidden flex justify-center">
  <img
    src="/Mintues.png"
    alt="Delivery Banner"
    className="w-full max-h-88 md:max-h-104 object-contain rounded-xl shadow-md"
  />
</div>



      {/* Title */}
      <h2 className="text-3xl font-bold bg-linear-to-r from-[#0f172a] to-[#1e3a8a] bg-clip-text text-transparent mb-12">
        Find Your Deliverables
      </h2>

      {/* Category Cards */}
      <div className="flex flex-wrap justify-center gap-10 w-[90%] max-w-7xl">
        {showData.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-between bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out p-5 w-72 hover:scale-[1.03]"
          >
            <img
              src={item.img}
              alt={item.name}
              className="rounded-xl w-full h-60 object-cover"
            />

            <div className="text-lg font-semibold text-[#1e3a8a] mt-4">
              {item.name}
            </div>

            <button
              className="mt-5 bg-[#1e3a8a] text-white px-6 py-2 rounded-full hover:bg-[#3b82f6] transition-all duration-300 shadow-sm"
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HPage;
