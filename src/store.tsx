import axios from "axios"

export interface Images {
    filename: any
    path: string | undefined
    images: {
        filename: string,
        path: string
    }[]
}

export const fetchImages = async () => {
    const response = await axios.get('http://localhost:3001/api/images')
    console.info(response.data)
    return response.data
}

export const postImage = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('image', file)

    // Post the new image
    const response = await axios.post('http://localhost:3001/api/images', formData)
    return response.data
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export const deleteImage = async (filename: string) => {
  try {
    await axios.delete(`http://localhost:3001/api/images/${filename}`)
  } catch (error) {
    console.error('Error deleting image:', error)
    throw error
  }
}