import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const inventory = await prisma.inventoryItem.findMany()
    res.status(200).json(inventory)
  } else if (req.method === 'POST') {
    const data = req.body
    const item = await prisma.inventoryItem.create({ data })
    res.status(201).json(item)
  } else {
    res.status(405).end()
  }
}
