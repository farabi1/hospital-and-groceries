import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { GroceryItem } from '../data/groceries'

export interface CartItem {
  product: GroceryItem;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  checkoutStatus: 'idle' | 'success' | 'failed';
}

const initialState: CartState = {
  items: [],
  checkoutStatus: 'idle',
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<GroceryItem>) => {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
      state.checkoutStatus = 'idle';
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
      state.checkoutStatus = 'idle';
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.product.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item.product.id !== action.payload.id);
        }
      }
      state.checkoutStatus = 'idle';
    },
    clearCart: (state) => {
      state.items = [];
      state.checkoutStatus = 'idle';
    },
    checkout: (state) => {
      if (state.items.length > 0) {
        state.items = [];
        state.checkoutStatus = 'success';
      }
    },
    resetCheckout: (state) => {
      state.checkoutStatus = 'idle';
    }
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, checkout, resetCheckout } = cartSlice.actions

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => 
  state.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
export const selectCartCount = (state: RootState) => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectCheckoutStatus = (state: RootState) => state.cart.checkoutStatus;

export default cartSlice.reducer
