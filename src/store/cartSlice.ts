import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartState {
  items: Record<string, CartItem>;
}

const initialState: CartState = { items: {} };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const { id, name, price, image } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity++;
      } else {
        state.items[id] = { id, name, price, image, quantity: 1 };
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
    },
    decrementQty: (state, action: PayloadAction<string>) => {
      const item = state.items[action.payload];
      if (!item) return;
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        delete state.items[action.payload];
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addToCart, removeFromCart, decrementQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
