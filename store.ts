import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import appointmentReducer from './slices/appointmentSlice'
import doctorReducer from './slices/doctorSlice'
import inventoryReducer from './slices/inventorySlice'
import adminReducer from './slices/adminSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    appointments: appointmentReducer,
    doctors: doctorReducer,
    inventory: inventoryReducer,
    admin: adminReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch