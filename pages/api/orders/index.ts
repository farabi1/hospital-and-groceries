import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const orders = await prisma.order.findMany({ include: { items: true } })
    res.status(200).json(orders)
  } else if (req.method === 'POST') {
    const { items, ...orderData } = req.body
    const order = await prisma.order.create({
      data: {
        ...orderData,
        items: {
          create: items
        }
      },
      include: { items: true }
    })
    res.status(201).json(order)
  } else {
    res.status(405).end()
  }
}
