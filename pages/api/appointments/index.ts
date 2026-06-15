import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const appointments = await prisma.appointment.findMany()
    res.status(200).json(appointments)
  } else if (req.method === 'POST') {
    const data = req.body
    const appointment = await prisma.appointment.create({ data })
    res.status(201).json(appointment)
  } else {
    res.status(405).end()
  }
}
