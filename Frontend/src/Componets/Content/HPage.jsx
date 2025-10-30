import React, { useState, useEffect } from "react";

const HPage = () => {
  const [showData, setshowData] = useState([]);

  const [chocklateURL] = useState(
    "https://cdn.zeptonow.com/production/tr:w-210,ar-300-444,pr-true,f-auto,q-80/cms/category/ec7b14c6-2640-4165-b3ae-68c09a249ae0.png"
  );
  const [IceCreamURL] = useState(
    "https://cdn.zeptonow.com/production/tr:w-210,ar-225-334,pr-true,f-auto,q-80/cms/category/db346f5e-644f-426a-85af-92d707e086ac.png"
  );
  const [ColdDrinksURL] = useState(
    "https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/59d2c0cc-e776-407c-9142-7e69898d9eab.png"
  );


  useEffect(() => {
    const data = [
      { Name: "Chocolates", ImageUrl: chocklateURL },
      { Name: "Ice Creams", ImageUrl: IceCreamURL },
      { Name: "Cold Drinks", ImageUrl: ColdDrinksURL },
       { Name: "Chocolates", ImageUrl: chocklateURL },
      { Name: "Ice Creams", ImageUrl: IceCreamURL },
      { Name: "Cold Drinks", ImageUrl: ColdDrinksURL },
    ];
    setshowData(data);
  }, [chocklateURL, IceCreamURL, ColdDrinksURL]);

  return (
    <div className="min-h-screen bg-[#fdfaf6] flex flex-col items-center py-12">
      <h2 className="text-3xl font-bold text-[#1e3a8a] mb-10">
        Find Your Deliverables
      </h2>

      <div className="flex flex-wrap justify-center gap-30 w-[90%] max-w-9xl">
        {showData.map((data, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-between
                      from-[#e3f2fd] to-[#fdfaf6]
                       rounded-2xl shadow-md hover:shadow-xl
                       transition-all duration-300 ease-in-out
                       p-5 w-80 hover:scale-105"
          >
            <img
              src={data.ImageUrl}
              alt={data.Name}
              className="rounded-xl w-full h-80 object-cover"
            />

            <div className="text-lg font-semibold text-[#1e3a8a] mt-4">
              {data.Name}
            </div>

            <button
              className="mt-5 bg-[#1e3a8a] text-white px-5 py-2 rounded-full
                         hover:bg-[#3b82f6] transition-all duration-300 shadow-sm"
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
