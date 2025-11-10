import axios from "axios"
import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { CALL_ITEM } from "../../API/authAPI"

const Category = () => {
  const { category_name } = useParams()
  const [categoryitem, setcategoryitem] = useState([])
  const [loding, setloding] = useState(true)

useEffect(() => {
    const getCartData=()=>{
        setloding(true)
        try {
            const response=axios.get(`${CALL_ITEM}/:${category_name}`,{withCredentials:true})
            if(response.status===200){
                setcategoryitem(response.data)
            }

        } catch (error) {
            console.log(error)
            alert("This is error : "+error)
        }finally{
            setloding(false)
        }
    }

    getCartData()
    
  }, [])
  

  return (
    
    <div className="p-6">
        {loding===true ? 
        <div>
            <h2 className="text-2xl font-bold text-blue-800">
            Category: {category_name}
        </h2>
        <div>
            {/* will get catgeroy data from backend redis + backend */}
            {
                categoryitem.map((item,idx)=>(
                    <div key={item.id}>
                        <div>
                            name: {item.name} Current_Quantity:{item.Quantity}
                            addQuantity: <input type="text" value={"current quantity "+item.Quantity } 
                            onChange={(e) }
                            // now how should i update the innventory making a single call for all inventory will be messed up, means to much things to update on backend but sending a update call for each product will make too much db calls as thier can be lakhs of item updation and sending a object can also be problem as well
                            />

                            Description: {item.description} 

                            <button>
                                Make Change 
                                {/* this will change allow change of decription and quantity change on click this it will  opwn render the input box with previous data */}
                            </button>
                            <button>
                                save
                                {/* this will store description and quantity changes in  */}
                            </button>
                        </div>
                    </div>
                ))
            }

        </div>
        </div>

        :
        <div>
            loding...
        </div>
        
    }
    </div>
  )
}

export default Category
