import axios from "axios"

export interface Image {
    filename: any
    path: string | undefined
}

export const fetchImages = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/images')
    return response.data
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export const postImage = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('image', file)

    // Post the new image
    const response = await axios.post('http://localhost:3001/api/images', formData)
    if (response && response.data) {
      return response.data
    }
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
