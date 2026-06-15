import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: string;
  patientName: string;
}

export interface AppointmentState {
  appointments: Appointment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: AppointmentState = {
  appointments: [],
  status: 'idle',
}

export const fetchAppointments = createAsyncThunk('appointments/fetchAppointments', async () => {
  const response = await fetch('/api/appointments')
  return response.json()
})

export const bookAppointmentAsync = createAsyncThunk('appointments/bookAppointment', async (appointment: Omit<Appointment, 'id' | 'status'>) => {
  const response = await fetch('/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...appointment, status: 'booked' }),
  })
  return response.json()
})

export const updateAppointmentStatusAsync = createAsyncThunk('appointments/updateStatus', async ({ id, status }: { id: string, status: string }) => {
  const response = await fetch(`/api/appointments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  return response.json()
})

export const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => { state.status = 'loading' })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.appointments = action.payload
      })
      .addCase(bookAppointmentAsync.fulfilled, (state, action) => {
        state.appointments.push(action.payload)
      })
      .addCase(updateAppointmentStatusAsync.fulfilled, (state, action) => {
        const index = state.appointments.findIndex(a => a.id === action.payload.id)
        if (index !== -1) state.appointments[index] = action.payload
      })
  },
})

export const selectAppointments = (state: RootState) => state.appointments.appointments;
export const selectActiveAppointmentsCount = (state: RootState) => 
  state.appointments.appointments.filter(a => a.status === 'booked').length;
export const selectCompletedAppointmentsCount = (state: RootState) =>
  state.appointments.appointments.filter(a => a.status === 'completed').length;

export default appointmentSlice.reducer
