import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CALL_ITEM, UPDATE_ITEM } from "../../API/cartAPI";
import { motion } from "framer-motion";

export default function Category() {
  const { category_name } = useParams();
  const [categoryitem, setcategoryitem] = useState([]);
  const [loading, setloading] = useState(true);
  const [checkinfo, setcheckinfo] = useState(false);
  const [quantity, setquantity] = useState({});
  const [wholeChange, setwholeChange] = useState([]);
  const [saving, setSaving] = useState({});
  const [updating, setUpdating] = useState(false);

  const makeChange = (id, quantityObj) => {
    const item = Number(quantityObj[id]);
    if (!item || item <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }

    const updatedItem = { item_id: id, quantity: item };

    const filtered = wholeChange.filter((i) => i.item_id !== id);
    setwholeChange([...filtered, updatedItem]);

    setSaving((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setSaving((prev) => ({ ...prev, [id]: false })), 800);
  };

  const updateSend = async () => {
    if (!wholeChange.length) {
      alert("Nothing to update");
      return;
    }

    try {
      setUpdating(true);
      const response = await axios.post(
        UPDATE_ITEM,
        { obj: wholeChange },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Inventory updated successfully");
        setwholeChange([]);
      }
    } catch (error) {
      console.log(error);
      alert("Update failed" + error);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    const getCartData = async () => {
      setloading(true);
      try {
        const response = await axios.get(`${CALL_ITEM}/${category_name}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          if (response.data.message === "no object") {
            setcheckinfo(true);
            return;
          }
          setcategoryitem(response.data.obj);
        }
      } catch (error) {
        console.log(error);
        alert("Error: " + error);
      } finally {
        setloading(false);
      } 
    };
    getCartData();
  }, [category_name]);

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white p-8">
      <div className="text-center mb-10 flex flex-row justify-between items-center">
        <h1 className="text-3xl font-extrabold text-blue-800">
          🛒 {category_name.replace("-", " ").toUpperCase()} Inventory
        </h1>

        {wholeChange.length > 0 && (
          <button
            onClick={updateSend}
            disabled={updating}
            className={`px-5 py-2 rounded-lg text-white transition-all shadow-md ${
              updating ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {updating ? "Updating..." : "Update Inventory"}
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <h2 className="text-lg text-gray-600 animate-pulse">Loading...</h2>
        </div>
      ) : checkinfo ? (
        <div className="text-center text-gray-600">
          <h2>No items found for this category.</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryitem.map((item) => (
            <motion.div
              key={item.item_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border p-5 flex flex-col items-center space-y-4"
            >
              <img
                src={item.Image_URL || "/placeholder-product.png"}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-lg shadow-sm"
              />

              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>

              <p className="text-sm text-gray-500 text-center">
                {item.description || "No description available."}
              </p>

              <div className="flex items-center gap-3">
                <span className="text-gray-600 text-sm">Current:</span>
                <input
                  type="number"
                  className="w-20 px-2 py-1 border rounded-md text-center bg-gray-100"
                  value={item.quantity}
                  readOnly
                />

                <span className="text-gray-600 text-sm">Add:</span>
                <input
                  type="number"
                  className="w-20 px-2 py-1 border rounded-md text-center"
                  defaultValue={0}
                  onChange={(e) =>
                    setquantity({ ...quantity, [item.item_id]: e.target.value })
                  }
                />
              </div>

              <button
                className={`px-4 py-2 w-24 text-white rounded-lg transition-all shadow-md ${
                  saving[item.item_id]
                    ? "bg-green-500"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={() => makeChange(item.item_id, quantity)}
              >
                {saving[item.item_id] ? "Saved" : "Save"}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
