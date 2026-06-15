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
  status: 'booked' | 'completed' | 'cancelled';
  patientName: string;
}

export interface AppointmentState {
  appointments: Appointment[];
}

// Seed data for admin panel demo
const seedAppointments: Appointment[] = [
  {
    id: 'apt-seed-1',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Connor',
    department: 'Cardiology',
    date: '2026-06-13',
    timeSlot: '09:00 AM',
    notes: 'Routine heart checkup',
    status: 'completed',
    patientName: 'Alice Johnson',
  },
  {
    id: 'apt-seed-2',
    doctorId: 'doc-2',
    doctorName: 'Dr. Marcus Vance',
    department: 'Nutrition',
    date: '2026-06-14',
    timeSlot: '11:00 AM',
    notes: 'Diet plan review',
    status: 'completed',
    patientName: 'Bob Smith',
  },
  {
    id: 'apt-seed-3',
    doctorId: 'doc-3',
    doctorName: 'Dr. Elena Rostova',
    department: 'Pediatrics',
    date: '2026-06-15',
    timeSlot: '10:00 AM',
    notes: 'Child vaccination schedule',
    status: 'booked',
    patientName: 'Carol White',
  },
  {
    id: 'apt-seed-4',
    doctorId: 'doc-4',
    doctorName: 'Dr. David Kim',
    department: 'General Medicine',
    date: '2026-06-15',
    timeSlot: '02:30 PM',
    notes: 'Annual physical exam',
    status: 'booked',
    patientName: 'Daniel Garcia',
  },
  {
    id: 'apt-seed-5',
    doctorId: 'doc-5',
    doctorName: 'Dr. Alistair Reed',
    department: 'Orthopedics',
    date: '2026-06-16',
    timeSlot: '11:00 AM',
    notes: 'Knee pain follow-up',
    status: 'booked',
    patientName: 'Eva Martinez',
  },
  {
    id: 'apt-seed-6',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Connor',
    department: 'Cardiology',
    date: '2026-06-12',
    timeSlot: '03:30 PM',
    notes: '',
    status: 'cancelled',
    patientName: 'Frank Lee',
  },
];

const initialState: AppointmentState = {
  appointments: seedAppointments,
}

export const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    bookAppointment: (state, action: PayloadAction<Omit<Appointment, 'id' | 'status' | 'patientName'>>) => {
      const id = `apt-${Date.now()}`;
      state.appointments.push({
        ...action.payload,
        id,
        status: 'booked',
        patientName: 'Patient',
      });
    },
    cancelAppointment: (state, action: PayloadAction<string>) => {
      const apt = state.appointments.find(a => a.id === action.payload);
      if (apt) {
        apt.status = 'cancelled';
      }
    },
    completeAppointment: (state, action: PayloadAction<string>) => {
      const apt = state.appointments.find(a => a.id === action.payload);
      if (apt) {
        apt.status = 'completed';
      }
    },
  },
})

export const { bookAppointment, cancelAppointment, completeAppointment } = appointmentSlice.actions

export const selectAppointments = (state: RootState) => state.appointments.appointments;
export const selectActiveAppointmentsCount = (state: RootState) => 
  state.appointments.appointments.filter(a => a.status === 'booked').length;
export const selectCompletedAppointmentsCount = (state: RootState) =>
  state.appointments.appointments.filter(a => a.status === 'completed').length;

export default appointmentSlice.reducer
