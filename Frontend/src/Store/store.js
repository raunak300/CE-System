import { create } from "zustand";
import { persist } from "zustand/middleware";

const userStore = create(
  persist(
    (set, get) => ({
      loggedIn: false,

      userData: {
        name: "",
        email: "",
        address: "",
        role: "",
      },

      Cart:[],

      setUserData: (data) =>
        set((state) => ({
          userData: { ...state.userData, ...data },
        })),

      setLoggedIn: () => set(() => ({ loggedIn: true })),
      setLoggedOut: () => set(() => ({ loggedIn: false })),
        
      addToCart:(item)=>set((state)=>{
        let found= state.Cart.find((thing)=>thing.id!==item.id)
        if(found){
            return {
              Cart: state.Cart.map((p) =>
                  p.id === item.id ? { ...p, qty: item.qty } : p
            
        )
        }
      }
      return{
        
      }
          
      })
      ,
      removeFromCart:(id)=>
        set((state)=>{
          let arr=state.Cart.filter((item)=>item.id)
        })
      ,
      clearUserData: () =>
        set(() => ({
          userData: {
            name: "",
            email: "",
            address: "",
          },
        })),
    }),
    { name: "user-storage" }
  )
);

export default userStore;
