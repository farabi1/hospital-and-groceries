import { createSlice } from '@reduxjs/toolkit'
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
  status: 'booked' | 'cancelled';
}

export interface AppointmentState {
  appointments: Appointment[];
}

const initialState: AppointmentState = {
  appointments: [],
}

export const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    bookAppointment: (state, action: PayloadAction<Omit<Appointment, 'id' | 'status'>>) => {
      const id = `apt-${Date.now()}`;
      state.appointments.push({
        ...action.payload,
        id,
        status: 'booked'
      });
    },
    cancelAppointment: (state, action: PayloadAction<string>) => {
      const apt = state.appointments.find(a => a.id === action.payload);
      if (apt) {
        apt.status = 'cancelled';
      }
    }
  },
})

export const { bookAppointment, cancelAppointment } = appointmentSlice.actions

export const selectAppointments = (state: RootState) => state.appointments.appointments;
export const selectActiveAppointmentsCount = (state: RootState) => 
  state.appointments.appointments.filter(a => a.status === 'booked').length;

export default appointmentSlice.reducer
