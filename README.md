# MedGrocer - Integrated Wellness Hub

MedGrocer is a modern web application that bridges the gap between medical consultations and nutritional wellness. Users can book appointments with specialized doctors and shop for tailored, nutritionist-approved healthy groceries in a single, unified interface.

## Features

### Customer Portal
- **Dashboard Overview**: Track your next medical appointments and shopping cart simultaneously.
- **Dynamic Medical Recommendations**: Get personalized grocery suggestions based on your upcoming doctor's specialty (e.g., Heart-Healthy items for Cardiology, Diabetic-Friendly for General Medicine).
- **Doctors Portal**: Search, filter by department, and book consultation slots with top doctors.
- **Healthy Grocery Shop**: Browse premium ingredients filtered by categories and health tags (Keto, Organic, High Protein). Add items to your cart seamlessly.
- **Cart & Bookings Checkout**: Review your scheduled consultations and finalize your grocery orders with delivery or pickup options.

### Admin Panel (`/admin`)
- **Secure Access**: Simple PIN protection (`1234` for demo)
- **KPI Dashboard**: View total revenue, order counts, upcoming appointments, low stock alerts, and a 7-day CSS bar chart.
- **Orders Management**: Track, filter, and update the status of customer grocery orders (Pending -> Processing -> Shipped -> Delivered).
- **Appointments Management**: View all patient bookings, mark them as completed, or cancel them.
- **Doctors CRUD**: Manage the platform's medical staff. Add new doctors, edit their specialties, consultation fees, and bios. Updates instantly reflect on the customer portal.
- **Inventory CRUD**: Manage the grocery store catalog. Add products, update prices, manage stock levels, and toggle product availability. Updates instantly reflect on the customer portal.
- **Platform Settings**: Configure store name, tax rates, and delivery fees.

## Tech Stack
- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS v4 (CSS-first engine)
- **State Management**: Redux Toolkit (Central store for Cart, Appointments, Doctors, Inventory, and Admin settings)
- **Design System**: Fully responsive mobile-first architecture, safe-area inset support, glassmorphic UI elements, and pure CSS animations/charts.
- **Node Engine**: Node.js 24.x (Optimized for Vercel deployment)

## Getting Started

### Local Development

1. Ensure you have Node.js 24.x installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Admin Access
Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) and enter PIN: `1234`

## Project Structure
- `/pages` - Next.js routes (`index.tsx` for customer app, `admin.tsx` for admin portal)
- `/components` - React components for the customer interface
- `/components/admin` - React components dedicated to the admin panel
- `/slices` - Redux Toolkit state slices
- `/styles` - Global CSS containing Tailwind v4 configuration and responsive base rules
