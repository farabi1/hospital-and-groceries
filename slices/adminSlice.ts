import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface OrderItem {
  id?: string;
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
  deliveryMethod: string;
  status: string;
  createdAt: string;
  customerName: string;
}

export interface AdminSettings {
  id?: string;
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
  ordersStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  settingsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: AdminState = {
  orders: [],
  settings: {
    storeName: 'MedGrocer',
    storeDescription: 'Integrated hospital and healthy grocery wellness platform.',
    taxRate: 8,
    deliveryFee: 4.99,
    operatingHours: '8:00 AM - 10:00 PM',
  },
  isAuthenticated: false,
  ordersStatus: 'idle',
  settingsStatus: 'idle',
}

// Async thunks
export const fetchOrders = createAsyncThunk('admin/fetchOrders', async () => {
  const response = await fetch('/api/orders')
  return response.json()
})

export const createOrderAsync = createAsyncThunk('admin/createOrder', async (order: Omit<Order, 'id' | 'createdAt'>) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  })
  return response.json()
})

export const updateOrderStatusAsync = createAsyncThunk('admin/updateOrderStatus', async ({ id, status }: { id: string; status: string }) => {
  const response = await fetch(`/api/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  return response.json()
})

export const fetchSettings = createAsyncThunk('admin/fetchSettings', async () => {
  const response = await fetch('/api/settings')
  return response.json()
})

export const updateSettingsAsync = createAsyncThunk('admin/updateSettings', async (settings: Partial<AdminSettings>) => {
  const response = await fetch('/api/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  })
  return response.json()
})

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => { state.ordersStatus = 'loading' })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.ordersStatus = 'succeeded'
        state.orders = action.payload
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.orders.push(action.payload)
      })
      .addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
        const index = state.orders.findIndex(o => o.id === action.payload.id)
        if (index !== -1) state.orders[index] = action.payload
      })
      .addCase(fetchSettings.pending, (state) => { state.settingsStatus = 'loading' })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.settingsStatus = 'succeeded'
        state.settings = action.payload
      })
      .addCase(updateSettingsAsync.fulfilled, (state, action) => {
        state.settings = action.payload
      })
  },
})

export const { adminLogin, adminLogout } = adminSlice.actions

// Selectors
export const selectOrders = (state: RootState) => state.admin.orders;
export const selectAdminSettings = (state: RootState) => state.admin.settings;
export const selectIsAdminAuthenticated = (state: RootState) => state.admin.isAuthenticated;
export const selectTotalRevenue = (state: RootState) =>
  state.admin.orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0);
export const selectOrderCount = (state: RootState) => state.admin.orders.length;
export const selectPendingOrderCount = (state: RootState) =>
  state.admin.orders.filter(o => o.status === 'pending').length;

export default adminSlice.reducer
