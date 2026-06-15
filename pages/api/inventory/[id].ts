import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (req.method === 'PUT') {
    const data = req.body
    const item = await prisma.inventoryItem.update({ where: { id: String(id) }, data })
    res.status(200).json(item)
  } else if (req.method === 'DELETE') {
    await prisma.inventoryItem.delete({ where: { id: String(id) } })
    res.status(204).end()
  } else {
    res.status(405).end()
  }
}
