import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDoctors, Doctor } from '../slices/doctorSlice';
import { bookAppointment } from '../slices/appointmentSlice';

export const DoctorsPortal: React.FC = () => {
  const dispatch = useDispatch();
  const doctors = useSelector(selectDoctors);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Departments List
  const departments = ['All', 'Cardiology', 'Nutrition', 'Pediatrics', 'General Medicine', 'Orthopedics'];

  // Filtered Doctors
  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || doc.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleOpenBooking = (doctor: Doctor, slot: string) => {
    const today = new Date().toISOString().split('T')[0];
    setBookingDoctor(doctor);
    setSelectedSlot(slot);
    setBookingDate(today);
    setBookingNotes('');
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDoctor || !selectedSlot || !bookingDate) return;

    dispatch(bookAppointment({
      doctorId: bookingDoctor.id,
      doctorName: bookingDoctor.name,
      department: bookingDoctor.department,
      date: bookingDate,
      timeSlot: selectedSlot,
      notes: bookingNotes
    }));

    setBookingDoctor(null);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Toast Alert */}
      {showSuccessToast && (
        <div className="fixed bottom-20 md:bottom-5 right-3 sm:right-5 z-50 flex items-center gap-3 rounded-2xl bg-slate-900 px-5 sm:px-6 py-3.5 sm:py-4 text-white shadow-2xl animate-bounce border border-slate-700 max-w-[calc(100vw-1.5rem)]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 text-slate-900 font-bold">✓</span>
          <div className="text-sm font-semibold">Appointment booked successfully!</div>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-800">Medical Specialists</h2>
        <p className="text-sm text-slate-500">Find experienced doctors and book immediate online or physical consultations.</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by doctor name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Department Filters */}
        <div className="flex flex-wrap gap-2">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition duration-200 ${
                selectedDept === dept
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor Cards Listing */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map(doc => (
            <div key={doc.id} className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="space-y-4">
                {/* Header Profile */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{doc.name}</h3>
                    <div className="text-xs text-teal-600 font-semibold">{doc.specialty}</div>
                  </div>
                  <div className="flex items-center gap-1 rounded-lg bg-teal-50 px-2 py-1 text-xs font-bold text-teal-700">
                    <span>★</span>
                    <span>{doc.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">{doc.bio}</p>

                {/* Experience & Fee */}
                <div className="flex justify-between border-t border-slate-50 pt-3 text-xs text-slate-600">
                  <div>
                    Exp: <span className="font-semibold text-slate-800">{doc.experience} years</span>
                  </div>
                  <div>
                    Consultation Fee: <span className="font-bold text-slate-800">${doc.fee}</span>
                  </div>
                </div>

                {/* Time Slots */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Available Slots Today:</div>
                  <div className="flex flex-wrap gap-2">
                    {doc.availableSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => handleOpenBooking(doc, slot)}
                        className="rounded-lg bg-slate-50 border border-slate-200/60 px-3 py-1.5 text-xs text-slate-700 transition hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 py-12 text-center text-slate-400">
            No doctors found matching your query.
          </div>
        )}
      </div>

      {/* Booking Form Modal */}
      {bookingDoctor && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 p-0 sm:p-4 backdrop-blur-sm">
          <div className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-2xl animate-fade-in border border-slate-100 max-h-[90dvh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-800">Confirm Booking</h3>
              <button 
                onClick={() => setBookingDoctor(null)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Doctor</label>
                <div className="mt-1 text-sm font-bold text-slate-800">{bookingDoctor.name}</div>
                <div className="text-xs text-teal-600">{bookingDoctor.specialty}</div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Time Slot</label>
                <div className="mt-1 text-sm font-bold text-slate-800 bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-2 inline-block">
                  {selectedSlot}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Appointment Date</label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Reason / Symptoms (Optional)</label>
                <textarea
                  placeholder="E.g., routine cardiological checkup, chronic high pressure, chest pain..."
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setBookingDoctor(null)}
                  className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-teal-600 py-3 text-sm font-bold text-white hover:bg-teal-700 transition shadow-sm"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
