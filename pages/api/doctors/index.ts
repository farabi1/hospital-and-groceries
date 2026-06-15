import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const doctors = await prisma.doctor.findMany()
    res.status(200).json(doctors)
  } else if (req.method === 'POST') {
    const data = req.body
    const doctor = await prisma.doctor.create({ data })
    res.status(201).json(doctor)
  } else {
    res.status(405).end()
  }
}
