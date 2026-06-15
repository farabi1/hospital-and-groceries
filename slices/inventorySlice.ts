import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  healthTag: string;
  description: string;
  calorieInfo: string;
  healthBenefit: string;
  stock: number;
  available: boolean;
}

export interface InventoryState {
  items: InventoryItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: InventoryState = {
  items: [],
  status: 'idle',
}

export const fetchInventory = createAsyncThunk('inventory/fetchInventory', async () => {
  const response = await fetch('/api/inventory')
  return response.json()
})

export const createProduct = createAsyncThunk('inventory/createProduct', async (item: Omit<InventoryItem, 'id'>) => {
  const response = await fetch('/api/inventory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  })
  return response.json()
})

export const updateProductAsync = createAsyncThunk('inventory/updateProduct', async (item: InventoryItem) => {
  const response = await fetch(`/api/inventory/${item.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  })
  return response.json()
})

export const deleteProduct = createAsyncThunk('inventory/deleteProduct', async (id: string) => {
  await fetch(`/api/inventory/${id}`, { method: 'DELETE' })
  return id
})

export const toggleAvailabilityAsync = createAsyncThunk('inventory/toggleAvailability', async (id: string, { getState }) => {
  const state = getState() as RootState
  const item = state.inventory.items.find(i => i.id === id)
  if (!item) throw new Error('Item not found')
  const response = await fetch(`/api/inventory/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ available: !item.available }),
  })
  return response.json()
})

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => { state.status = 'loading' })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(i => i.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload)
      })
      .addCase(toggleAvailabilityAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(i => i.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })
  },
})

export const selectInventory = (state: RootState) => state.inventory.items;
export const selectAvailableInventory = (state: RootState) => state.inventory.items.filter(i => i.available);
export const selectProductCount = (state: RootState) => state.inventory.items.length;
export const selectLowStockItems = (state: RootState) => state.inventory.items.filter(i => i.stock < 20);

export default inventorySlice.reducer
