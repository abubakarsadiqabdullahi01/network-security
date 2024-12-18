import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const API_KEY = process.env.VIRUSTOTAL_API_KEY || "e3c902121a250951e8fc66f8fce319d55eb54eebc1783b864d1a4d5596474775";
const BASE_URL = 'https://www.virustotal.com/api/v3'

const virusTotalApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-apikey': API_KEY,
  },
})

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!API_KEY) {
    console.error('VIRUSTOTAL_API_KEY is not set')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const { id } = params

  try {
    const response = await virusTotalApi.get(`/analyses/${id}`)
    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error fetching analysis:', error)
    if (axios.isAxiosError(error)) {
      console.error('VirusTotal API Error:', error.response?.data)
    }
    return NextResponse.json({ error: 'Error fetching analysis' }, { status: 500 })
  }
}

