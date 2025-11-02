import { create } from 'zustand'
import {persist} from 'zustand/middleware'


const userStore = create(
  persist((set,get)=>
  ({
    userData:{
      name:"",
      email:"",
      address:"",
      cart:[]
    },
    setuserData:(data)=>set((state)=>({
      userData: {...state.userData,...data}
    })),
    addtoCart:(item)=>set((state)=>({
      userData:{
        ...state.userData,
        cart:[...state.userData.cart,item]
      }
    })),

    removefromCart: (id)=>set((state)=>({
      userData:{
        ...state.userData,
        cart: state.userData.cart.filter((item)=>item.id!==id)
      }
    })),

    clearCart: ()=>set((state)=>({
      userData:{
        ...state.userData,
        cart:[]
      }
    })),

    clearUserData:()=>set((state)=>({
      userData:{
        name:"",
        email:"",
        address:"",
        cart:[]
      }
    }))

  })
    , {name:'user-storage'}
  )
)

export default userStore;
