export interface GroceryItem {
  id: string;
  name: string;
  category: 'Produce' | 'Dairy & Eggs' | 'Pantry' | 'Bakery' | 'Supplements';
  price: number;
  rating: number;
  healthTag: 'Heart Healthy' | 'Diabetic Friendly' | 'Organic' | 'High Protein' | 'Keto' | 'General';
  description: string;
  calorieInfo: string;
  healthBenefit: string;
}

export const groceries: GroceryItem[] = [
  {
    id: 'groc-1',
    name: 'Organic Fresh Blueberries',
    category: 'Produce',
    price: 4.99,
    rating: 4.9,
    healthTag: 'Organic',
    description: 'Packed with antioxidants, fresh, sweet, and hand-picked organic blueberries.',
    calorieInfo: '57 kcal per 100g',
    healthBenefit: 'Boosts brain health and antioxidants.'
  },
  {
    id: 'groc-2',
    name: 'Omega-3 Free Range Eggs',
    category: 'Dairy & Eggs',
    price: 5.49,
    rating: 4.8,
    healthTag: 'High Protein',
    description: 'Farm fresh eggs enriched with Omega-3 fatty acids from healthy hens.',
    calorieInfo: '143 kcal per 100g',
    healthBenefit: 'Supports heart health and muscle repair.'
  },
  {
    id: 'groc-3',
    name: 'Gluten-Free Rolled Oats',
    category: 'Pantry',
    price: 3.99,
    rating: 4.7,
    healthTag: 'Heart Healthy',
    description: '100% whole grain rolled oats, perfect for a cholesterol-lowering breakfast.',
    calorieInfo: '389 kcal per 100g',
    healthBenefit: 'Helps lower LDL cholesterol levels.'
  },
  {
    id: 'groc-4',
    name: 'Almond Milk (Unsweetened)',
    category: 'Dairy & Eggs',
    price: 3.29,
    rating: 4.6,
    healthTag: 'Keto',
    description: 'Creamy, dairy-free almond milk with zero added sugar and low carbs.',
    calorieInfo: '15 kcal per 100g',
    healthBenefit: 'Low calorie, calcium-rich alternative.'
  },
  {
    id: 'groc-5',
    name: 'Organic Baby Spinach',
    category: 'Produce',
    price: 3.49,
    rating: 4.9,
    healthTag: 'Diabetic Friendly',
    description: 'Pre-washed organic spinach leaves, rich in iron, vitamins, and minerals.',
    calorieInfo: '23 kcal per 100g',
    healthBenefit: 'Regulates blood glucose levels.'
  },
  {
    id: 'groc-6',
    name: 'Wild Caught Pink Salmon (Can)',
    category: 'Pantry',
    price: 6.99,
    rating: 4.8,
    healthTag: 'Heart Healthy',
    description: 'Sustainably wild-caught pink salmon rich in healthy fats and proteins.',
    calorieInfo: '127 kcal per 100g',
    healthBenefit: 'Improves artery function.'
  },
  {
    id: 'groc-7',
    name: 'High-Fiber Chia Seeds',
    category: 'Pantry',
    price: 7.49,
    rating: 4.7,
    healthTag: 'Diabetic Friendly',
    description: 'Premium black chia seeds packed with fiber, protein, and Omega-3s.',
    calorieInfo: '486 kcal per 100g',
    healthBenefit: 'Slows digestion to prevent blood sugar spikes.'
  },
  {
    id: 'groc-8',
    name: 'Greek Yogurt (Plain, 0% Fat)',
    category: 'Dairy & Eggs',
    price: 4.29,
    rating: 4.8,
    healthTag: 'High Protein',
    description: 'Thick, creamy, strained Greek yogurt rich in probiotics and high in protein.',
    calorieInfo: '59 kcal per 100g',
    healthBenefit: 'Promotes gut health and satiety.'
  },
  {
    id: 'groc-9',
    name: 'Sprouted Whole Wheat Bread',
    category: 'Bakery',
    price: 4.89,
    rating: 4.6,
    healthTag: 'Organic',
    description: 'Freshly baked sprouted grain bread with high bioavailability of nutrients.',
    calorieInfo: '220 kcal per 100g',
    healthBenefit: 'Easier digestion and low glycemic index.'
  },
  {
    id: 'groc-10',
    name: 'Vitamin D3 & K2 Drops',
    category: 'Supplements',
    price: 14.99,
    rating: 4.9,
    healthTag: 'General',
    description: 'Highly bioavailable liquid vitamin combination for bone and immune support.',
    calorieInfo: '0 kcal',
    healthBenefit: 'Improves calcium absorption and immunity.'
  }
];
