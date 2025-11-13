import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CALL_ITEM, UPDATE_ITEM } from "../../API/cartAPI";
import { motion } from "framer-motion";

const Category = () => {
  const { category_name } = useParams();
  const [categoryitem, setcategoryitem] = useState([]);
  const [loading, setloading] = useState(true);
  const [checkinfo, setcheckinfo] = useState(false);
  const [quantity, setquantity] = useState({})
  const [wholeChange, setwholeChange] = useState([])

  const makeChange = (id, quantity) => {
    const item=Number(quantity[id])
    if(!item || item<=0){
        alert("item must be greater than 0")
        return;
    }

    const obj={
        item_id:id,
        Quantity:item
    }

    const filtered=wholeChange.filter((item)=>item.item_id !==id)
    setwholeChange([...filtered,obj])
};

  const updateSend=async()=>{
    if(!wholeChange){
        alert("thiere is nothing to update")
        return;
    }
    const obj=wholeChange

    try {
      const response=await axios.post(UPDATE_ITEM,{obj},{withCredentials:true})
      if(response.status===200){
        alert(response)
        return;
      }
      console.log(response.data.message)
    } catch (error) {
      console.log(error)
      alert(error)
    }

  }

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
        alert("This is error: " + error);
      } finally {
        setloading(false);
      }
    };
    getCartData();
  }, [category_name]);



  return (
    <div className="min-h-screen bg-liear-to-b from-blue-50 to-white p-8">
      <div className="text-center mb-10 flex flex-row gap-30">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-2">
          🛒 {category_name.replace('-', ' ').toUpperCase()} Inventory
        </h1>
        <div>
            {
                wholeChange.length>0 ?
                <button onClick={()=>updateSend()} className="text-white text-l bg-blue-400  w-30 h-10 rounded=md">
                    Update Inventory
                </button>
                :
                <div>

                </div>
            
            }
        </div>
      </div>
        <p className="text-gray-600">
          Manage or update the product details below.
        </p>

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
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 border border-gray-100 p-5 flex flex-col items-center space-y-4"
            >
              <img
                src={item.Image_URL || "/placeholder-product.png"}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500 text-center">
                {item.description || "No description available."}
              </p>

              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">Current Qty:</span>
                <input
                  type="number"
                  className="w-20 px-2 py-1 border rounded-md text-center text-gray-700"
                  value={item.Quantity}
                  readOnly
                />
                 <span className="text-gray-600 text-sm">Add Qty:</span>
                <input
                  type="number"
                  className="w-20 px-2 py-1 border rounded-md text-center text-gray-700"
                  defaultValue={0}
                  onChange={(e)=>setquantity({...quantity,[item.item_id]:e.target.value})}
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-all"
                onClick={(e)=>makeChange(item.item_id,quantity)}
                >
                  Save
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;