import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const API_KEY = process.env.VIRUSTOTAL_API_KEY
const BASE_URL = 'https://www.virustotal.com/api/v3'

const virusTotalApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-apikey': API_KEY,
  },
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query

  try {
    const response = await virusTotalApi.get(`/files/${id}`)
    res.status(200).json(response.data)
  } catch (error) {
    console.error('Error fetching file report:', error)
    res.status(500).json({ error: 'Error fetching file report' })
  }
}

