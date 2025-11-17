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
        cart: [],
        role: "",
      },

      setUserData: (data) =>
        set((state) => ({
          userData: { ...state.userData, ...data },
        })),

      setLoggedIn: () => set(() => ({ loggedIn: true })),
      setLoggedOut: () => set(() => ({ loggedIn: false })),

      // ⭐ ADD OR INCREMENT
      addToCart: (item) =>
        set((state) => {
          const existing = state.userData.cart.find((i) => i.id === item.id);

          if (existing) {
            return {
              userData: {
                ...state.userData,
                cart: state.userData.cart.map((i) =>
                  i.id === item.id
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
                ),
              },
            };
          }

          return {
            userData: {
              ...state.userData,
              cart: [...state.userData.cart, { ...item, quantity: 1 }],
            },
          };
        }),

      // ⭐ DECREMENT OR REMOVE
      decrementFromCart: (id) =>
        set((state) => {
          const existing = state.userData.cart.find((i) => i.id === id);
          if (!existing) return state;

          if (existing.quantity === 1) {
            // remove item
            return {
              userData: {
                ...state.userData,
                cart: state.userData.cart.filter((i) => i.id !== id),
              },
            };
          }

          return {
            userData: {
              ...state.userData,
              cart: state.userData.cart.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity - 1 } : i
              ),
            },
          };
        }),

      clearCart: () =>
        set((state) => ({
          userData: { ...state.userData, cart: [] },
        })),

      clearUserData: () =>
        set(() => ({
          userData: {
            name: "",
            email: "",
            address: "",
            cart: [],
          },
        })),
    }),
    { name: "user-storage" }
  )
);

export default userStore;
