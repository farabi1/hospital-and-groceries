import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (req.method === 'PUT') {
    const data = req.body
    // Only update the order status
    const order = await prisma.order.update({ where: { id: String(id) }, data, include: { items: true } })
    res.status(200).json(order)
  } else {
    res.status(405).end()
  }
}
