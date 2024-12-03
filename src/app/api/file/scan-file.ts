import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing form data' })
      }

      const file = files.file as formidable.File
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' })
      }

      const fileStream = fs.createReadStream(file.filepath)
      const formData = new FormData()
      formData.append('file', fileStream, file.originalFilename)

      const response = await virusTotalApi.post('/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      res.status(200).json(response.data)
    })
  } catch (error) {
    console.error('Error scanning file:', error)
    res.status(500).json({ error: 'Error scanning file' })
  }
}

