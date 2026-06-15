import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  experience: number;
  rating: number;
  fee: number;
  bio: string;
  availableSlots: string[];
}

export interface DoctorState {
  doctors: Doctor[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: DoctorState = {
  doctors: [],
  status: 'idle',
}

export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
  const response = await fetch('/api/doctors')
  return response.json()
})

export const createDoctor = createAsyncThunk('doctors/createDoctor', async (doctor: Omit<Doctor, 'id'>) => {
  const response = await fetch('/api/doctors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doctor),
  })
  return response.json()
})

export const updateDoctorAsync = createAsyncThunk('doctors/updateDoctor', async (doctor: Doctor) => {
  const response = await fetch(`/api/doctors/${doctor.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doctor),
  })
  return response.json()
})

export const deleteDoctor = createAsyncThunk('doctors/deleteDoctor', async (id: string) => {
  await fetch(`/api/doctors/${id}`, { method: 'DELETE' })
  return id
})

export const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => { state.status = 'loading' })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.doctors = action.payload
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.doctors.push(action.payload)
      })
      .addCase(updateDoctorAsync.fulfilled, (state, action) => {
        const index = state.doctors.findIndex(d => d.id === action.payload.id)
        if (index !== -1) state.doctors[index] = action.payload
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.doctors = state.doctors.filter(d => d.id !== action.payload)
      })
  },
})

export const selectDoctors = (state: RootState) => state.doctors.doctors;
export const selectDoctorStatus = (state: RootState) => state.doctors.status;
export const selectDoctorCount = (state: RootState) => state.doctors.doctors.length;

export default doctorSlice.reducer
