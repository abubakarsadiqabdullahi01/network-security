import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export const config = {
  api: {
    bodyParser: false,
  },
}

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
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()
    const fileBlob = new Blob([buffer])

    const vtFormData = new FormData()
    vtFormData.append('file', fileBlob, file.name)

    const response = await virusTotalApi.post('/files', vtFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log('VirusTotal API Response:', response.data)
    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error scanning file:', error)
    if (axios.isAxiosError(error)) {
      console.error('VirusTotal API Error:', error.response?.data)
    }
    return NextResponse.json({ error: 'Error scanning file' }, { status: 500 })
  }
}