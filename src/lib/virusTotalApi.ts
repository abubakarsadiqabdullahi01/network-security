import axios from 'axios'

const BASE_URL = '/api'

const virusTotalApi = axios.create({
  baseURL: BASE_URL,
})

export const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await virusTotalApi.post('/scan-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

export const getAnalysis = async (analysisId: string) => {
  try {
    const response = await virusTotalApi.get(`/analysis/${analysisId}`)
    return response.data
  } catch (error) {
    console.error('Error getting analysis:', error)
    throw error
  }
}

export const scanUrl = async (url: string) => {
  try {
    const response = await virusTotalApi.post('/scan-url', { url })
    return response.data
  } catch (error) {
    console.error('Error scanning URL:', error)
    throw error
  }
}

