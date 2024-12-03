import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const API_KEY = process.env.VIRUSTOTAL_API_KEY
const BASE_URL = 'https://www.virustotal.com/api/v3'

const virusTotalApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-apikey': API_KEY,
  },
})

export async function POST(req: NextRequest) {
  if (!API_KEY) {
    console.error('VIRUSTOTAL_API_KEY is not set')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const encodedUrl = encodeURIComponent(url)
    const response = await virusTotalApi.post('/urls', `url=${encodedUrl}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error scanning URL:', error)
    if (axios.isAxiosError(error)) {
      console.error('VirusTotal API Error:', error.response?.data)
    }
    return NextResponse.json({ error: 'Error scanning URL' }, { status: 500 })
  }
}

