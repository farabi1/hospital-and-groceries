import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface OrderItem {
  productId: string;
  productName: string;
  category: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  deliveryMethod: 'delivery' | 'pickup';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  customerName: string;
}

export interface AdminSettings {
  storeName: string;
  storeDescription: string;
  taxRate: number;
  deliveryFee: number;
  operatingHours: string;
}

export interface AdminState {
  orders: Order[];
  settings: AdminSettings;
  isAuthenticated: boolean;
}

// Seed with realistic mock order data
const seedOrders: Order[] = [
  {
    id: 'ORD-1001',
    items: [
      { productId: 'groc-1', productName: 'Organic Fresh Blueberries', category: 'Produce', price: 4.99, quantity: 2 },
      { productId: 'groc-3', productName: 'Gluten-Free Rolled Oats', category: 'Pantry', price: 3.99, quantity: 1 },
    ],
    subtotal: 13.97, tax: 1.12, deliveryFee: 4.99, total: 20.08,
    deliveryMethod: 'delivery', status: 'delivered', createdAt: '2026-06-13T09:15:00Z', customerName: 'Alice Johnson',
  },
  {
    id: 'ORD-1002',
    items: [
      { productId: 'groc-6', productName: 'Wild Caught Pink Salmon', category: 'Pantry', price: 6.99, quantity: 3 },
      { productId: 'groc-8', productName: 'Greek Yogurt (0% Fat)', category: 'Dairy & Eggs', price: 4.29, quantity: 2 },
    ],
    subtotal: 29.55, tax: 2.36, deliveryFee: 0, total: 31.91,
    deliveryMethod: 'pickup', status: 'delivered', createdAt: '2026-06-13T14:30:00Z', customerName: 'Bob Smith',
  },
  {
    id: 'ORD-1003',
    items: [
      { productId: 'groc-2', productName: 'Omega-3 Free Range Eggs', category: 'Dairy & Eggs', price: 5.49, quantity: 1 },
      { productId: 'groc-5', productName: 'Organic Baby Spinach', category: 'Produce', price: 3.49, quantity: 2 },
      { productId: 'groc-10', productName: 'Vitamin D3 & K2 Drops', category: 'Supplements', price: 14.99, quantity: 1 },
    ],
    subtotal: 27.46, tax: 2.20, deliveryFee: 4.99, total: 34.65,
    deliveryMethod: 'delivery', status: 'shipped', createdAt: '2026-06-14T10:00:00Z', customerName: 'Carol White',
  },
  {
    id: 'ORD-1004',
    items: [
      { productId: 'groc-7', productName: 'High-Fiber Chia Seeds', category: 'Pantry', price: 7.49, quantity: 2 },
      { productId: 'groc-4', productName: 'Almond Milk (Unsweetened)', category: 'Dairy & Eggs', price: 3.29, quantity: 3 },
    ],
    subtotal: 24.85, tax: 1.99, deliveryFee: 4.99, total: 31.83,
    deliveryMethod: 'delivery', status: 'processing', createdAt: '2026-06-14T16:45:00Z', customerName: 'Daniel Garcia',
  },
  {
    id: 'ORD-1005',
    items: [
      { productId: 'groc-9', productName: 'Sprouted Whole Wheat Bread', category: 'Bakery', price: 4.89, quantity: 2 },
    ],
    subtotal: 9.78, tax: 0.78, deliveryFee: 0, total: 10.56,
    deliveryMethod: 'pickup', status: 'pending', createdAt: '2026-06-15T08:20:00Z', customerName: 'Eva Martinez',
  },
  {
    id: 'ORD-1006',
    items: [
      { productId: 'groc-1', productName: 'Organic Fresh Blueberries', category: 'Produce', price: 4.99, quantity: 3 },
      { productId: 'groc-6', productName: 'Wild Caught Pink Salmon', category: 'Pantry', price: 6.99, quantity: 1 },
      { productId: 'groc-8', productName: 'Greek Yogurt (0% Fat)', category: 'Dairy & Eggs', price: 4.29, quantity: 4 },
    ],
    subtotal: 39.12, tax: 3.13, deliveryFee: 4.99, total: 47.24,
    deliveryMethod: 'delivery', status: 'pending', createdAt: '2026-06-15T11:00:00Z', customerName: 'Frank Lee',
  },
];

const initialState: AdminState = {
  orders: seedOrders,
  settings: {
    storeName: 'MedGrocer',
    storeDescription: 'Integrated hospital and healthy grocery wellness platform.',
    taxRate: 8,
    deliveryFee: 4.99,
    operatingHours: '8:00 AM - 10:00 PM',
  },
  isAuthenticated: false,
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminLogin: (state) => {
      state.isAuthenticated = true;
    },
    adminLogout: (state) => {
      state.isAuthenticated = false;
    },
    createOrder: (state, action: PayloadAction<Omit<Order, 'id' | 'createdAt' | 'status'>>) => {
      const id = `ORD-${1000 + state.orders.length + 1}`;
      state.orders.push({
        ...action.payload,
        id,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
      const order = state.orders.find(o => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
    updateSettings: (state, action: PayloadAction<Partial<AdminSettings>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
})

export const { adminLogin, adminLogout, createOrder, updateOrderStatus, updateSettings } = adminSlice.actions

// Selectors
export const selectOrders = (state: RootState) => state.admin.orders;
export const selectOrderById = (id: string) => (state: RootState) =>
  state.admin.orders.find(o => o.id === id);
export const selectOrdersByStatus = (status: Order['status']) => (state: RootState) =>
  state.admin.orders.filter(o => o.status === status);
export const selectAdminSettings = (state: RootState) => state.admin.settings;
export const selectIsAdminAuthenticated = (state: RootState) => state.admin.isAuthenticated;

export const selectTotalRevenue = (state: RootState) =>
  state.admin.orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0);
export const selectOrderCount = (state: RootState) => state.admin.orders.length;
export const selectPendingOrderCount = (state: RootState) =>
  state.admin.orders.filter(o => o.status === 'pending').length;

export default adminSlice.reducer
