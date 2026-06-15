import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    let settings = await prisma.adminSettings.findFirst()
    if (!settings) {
      settings = await prisma.adminSettings.create({
        data: {
          storeName: 'MedGrocer',
          storeDescription: 'Integrated hospital and healthy grocery wellness platform.',
          taxRate: 8,
          deliveryFee: 4.99,
          operatingHours: '8:00 AM - 10:00 PM',
        }
      })
    }
    res.status(200).json(settings)
  } else if (req.method === 'PUT') {
    const data = req.body
    let settings = await prisma.adminSettings.findFirst()
    if (settings) {
      settings = await prisma.adminSettings.update({ where: { id: settings.id }, data })
    }
    res.status(200).json(settings)
  } else {
    res.status(405).end()
  }
}
