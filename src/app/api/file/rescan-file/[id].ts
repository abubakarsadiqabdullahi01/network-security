import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const API_KEY = const API_KEY = process.env.VIRUSTOTAL_API_KEY || "e3c902121a250951e8fc66f8fce319d55eb54eebc1783b864d1a4d5596474775";
const BASE_URL = 'https://www.virustotal.com/api/v3'

const virusTotalApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-apikey': API_KEY,
  },
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query

  try {
    const response = await virusTotalApi.post(`/files/${id}/analyse`)
    res.status(200).json(response.data)
  } catch (error) {
    console.error('Error rescanning file:', error)
    res.status(500).json({ error: 'Error rescanning file' })
  }
}

