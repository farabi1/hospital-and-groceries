export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: 'Cardiology' | 'Pediatrics' | 'Nutrition' | 'General Medicine' | 'Orthopedics';
  experience: number;
  rating: number;
  fee: number;
  bio: string;
  availableSlots: string[];
}

export const doctors: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Connor',
    specialty: 'Cardiologist (Heart Specialist)',
    department: 'Cardiology',
    experience: 12,
    rating: 4.9,
    fee: 120,
    bio: 'Specialist in cardiovascular health, hypertension management, and preventive heart care.',
    availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM']
  },
  {
    id: 'doc-2',
    name: 'Dr. Marcus Vance',
    specialty: 'Clinical Nutritionist & Dietitian',
    department: 'Nutrition',
    experience: 8,
    rating: 4.8,
    fee: 80,
    bio: 'Dedicated to helping patients achieve optimal wellness through tailored, nutrition-focused eating plans.',
    availableSlots: ['09:30 AM', '11:00 AM', '01:00 PM', '04:00 PM']
  },
  {
    id: 'doc-3',
    name: 'Dr. Elena Rostova',
    specialty: 'Senior Pediatrician',
    department: 'Pediatrics',
    experience: 15,
    rating: 5.0,
    fee: 100,
    bio: 'Compassionate healthcare provider focusing on infants, children, and adolescent developmental care.',
    availableSlots: ['10:00 AM', '11:30 AM', '03:00 PM', '05:00 PM']
  },
  {
    id: 'doc-4',
    name: 'Dr. David Kim',
    specialty: 'Family Physician',
    department: 'General Medicine',
    experience: 10,
    rating: 4.7,
    fee: 70,
    bio: 'Comprehensive primary care provider dealing with acute illnesses, chronic management, and general wellness checks.',
    availableSlots: ['08:30 AM', '10:00 AM', '02:30 PM', '04:30 PM']
  },
  {
    id: 'doc-5',
    name: 'Dr. Alistair Reed',
    specialty: 'Orthopedic Surgeon',
    department: 'Orthopedics',
    experience: 14,
    rating: 4.9,
    fee: 150,
    bio: 'Specialist in bone and joint health, sports injuries, and musculoskeletal disorders.',
    availableSlots: ['11:00 AM', '01:30 PM', '03:00 PM', '05:30 PM']
  }
];
