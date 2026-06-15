import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const pool = new Pool({ connectionString: process.env.DATABASE_URL! })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // Check if data already exists
  const existingDoctors = await prisma.doctor.count()
  if (existingDoctors > 0) {
    console.log('✅ Database already seeded, skipping...')
    return
  }

  // Seed Doctors
  await prisma.doctor.createMany({
    data: [
      {
        name: 'Dr. Amelia Hart',
        specialty: 'General Practitioner',
        department: 'General Medicine',
        experience: 12,
        rating: 4.9,
        fee: 80,
        bio: 'Dr. Hart is a dedicated GP with 12 years of experience in preventive care and chronic disease management.',
        availableSlots: ['9:00 AM', '10:30 AM', '2:00 PM', '4:30 PM'],
      },
      {
        name: 'Dr. James Chen',
        specialty: 'Cardiologist',
        department: 'Cardiology',
        experience: 18,
        rating: 4.8,
        fee: 150,
        bio: 'A leading cardiologist specializing in heart disease prevention, diagnosis, and cutting-edge interventional procedures.',
        availableSlots: ['8:00 AM', '11:00 AM', '3:00 PM'],
      },
      {
        name: 'Dr. Sofia Patel',
        specialty: 'Nutritionist',
        department: 'Nutrition & Dietetics',
        experience: 8,
        rating: 4.9,
        fee: 90,
        bio: 'Dr. Patel creates personalized nutrition plans backed by science, helping patients achieve optimal health and energy.',
        availableSlots: ['10:00 AM', '1:00 PM', '3:30 PM', '5:00 PM'],
      },
      {
        name: 'Dr. Marcus Webb',
        specialty: 'Dermatologist',
        department: 'Dermatology',
        experience: 15,
        rating: 4.7,
        fee: 120,
        bio: 'Renowned dermatologist with expertise in skin disorders, cosmetic procedures, and skin cancer screening.',
        availableSlots: ['9:30 AM', '11:30 AM', '2:30 PM'],
      },
      {
        name: 'Dr. Lena Müller',
        specialty: 'Pediatrician',
        department: 'Pediatrics',
        experience: 10,
        rating: 4.9,
        fee: 100,
        bio: 'Dr. Müller is passionate about children\'s health, providing compassionate care from newborns to adolescents.',
        availableSlots: ['8:30 AM', '10:00 AM', '1:30 PM', '4:00 PM'],
      },
    ],
  })
  console.log('✅ Seeded 5 doctors')

  // Seed Inventory
  await prisma.inventoryItem.createMany({
    data: [
      {
        name: 'Organic Spinach',
        category: 'Vegetables',
        price: 3.49,
        rating: 4.8,
        healthTag: 'Iron Rich',
        description: 'Fresh organic baby spinach, packed with iron and vitamins.',
        calorieInfo: '23 kcal / 100g',
        healthBenefit: 'Boosts energy and supports bone health',
        stock: 150,
        available: true,
      },
      {
        name: 'Wild Blueberries',
        category: 'Fruits',
        price: 6.99,
        rating: 4.9,
        healthTag: 'Antioxidant',
        description: 'Frozen wild blueberries sourced from pristine Nordic forests.',
        calorieInfo: '57 kcal / 100g',
        healthBenefit: 'Fights oxidative stress and supports brain health',
        stock: 80,
        available: true,
      },
      {
        name: 'Quinoa (Organic)',
        category: 'Grains',
        price: 8.99,
        rating: 4.7,
        healthTag: 'High Protein',
        description: 'Complete protein grain, perfect for salads and grain bowls.',
        calorieInfo: '368 kcal / 100g',
        healthBenefit: 'Complete amino acid profile for muscle recovery',
        stock: 60,
        available: true,
      },
      {
        name: 'Greek Yogurt (2%)',
        category: 'Dairy',
        price: 4.49,
        rating: 4.8,
        healthTag: 'Probiotic',
        description: 'Thick, creamy Greek yogurt rich in probiotics and protein.',
        calorieInfo: '73 kcal / 100g',
        healthBenefit: 'Supports gut microbiome and strengthens immunity',
        stock: 120,
        available: true,
      },
      {
        name: 'Avocado',
        category: 'Fruits',
        price: 2.29,
        rating: 4.9,
        healthTag: 'Heart Healthy',
        description: 'Perfectly ripe Hass avocados, loaded with healthy monounsaturated fats.',
        calorieInfo: '160 kcal / 100g',
        healthBenefit: 'Lowers LDL cholesterol and supports heart health',
        stock: 200,
        available: true,
      },
      {
        name: 'Chia Seeds',
        category: 'Seeds & Nuts',
        price: 7.49,
        rating: 4.8,
        healthTag: 'Omega-3',
        description: 'Organic chia seeds, an excellent plant-based source of Omega-3.',
        calorieInfo: '486 kcal / 100g',
        healthBenefit: 'Reduces inflammation and supports joint health',
        stock: 90,
        available: true,
      },
      {
        name: 'Salmon Fillet',
        category: 'Seafood',
        price: 14.99,
        rating: 4.9,
        healthTag: 'Omega-3',
        description: 'Wild-caught Atlantic salmon, rich in heart-healthy Omega-3 fatty acids.',
        calorieInfo: '208 kcal / 100g',
        healthBenefit: 'Reduces triglycerides and supports cognitive function',
        stock: 45,
        available: true,
      },
      {
        name: 'Almond Butter',
        category: 'Pantry',
        price: 9.99,
        rating: 4.7,
        healthTag: 'High Protein',
        description: 'Natural, no-sugar-added almond butter for a nutritious snack.',
        calorieInfo: '614 kcal / 100g',
        healthBenefit: 'Provides sustained energy and supports muscle repair',
        stock: 75,
        available: true,
      },
    ],
  })
  console.log('✅ Seeded 8 inventory items')

  // Seed default admin settings
  await prisma.adminSettings.create({
    data: {
      storeName: 'MedGrocer',
      storeDescription: 'Integrated hospital and healthy grocery wellness platform.',
      taxRate: 8,
      deliveryFee: 4.99,
      operatingHours: '8:00 AM - 10:00 PM',
    },
  })
  console.log('✅ Seeded admin settings')

  console.log('🎉 Database seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
