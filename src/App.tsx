import { useEffect, useState } from 'react'
import { fetchImages, Image } from './store'
import { Box } from '@mui/material'
import { Header } from './components/Header'
import { ImageGrid } from './components/ImageGrid'

function App() {
  const [images, setImages] = useState<Image[]>([])
  const [searchText, setSearchText] = useState<string>('')

  const getImages = async () => {
    const imageData = await fetchImages()
    setImages(imageData)
  }

  useEffect(() => {
    getImages()
  }, [])

 const filteredImages = images.filter(image =>
    image.filename.toLowerCase().includes(searchText.toLowerCase())
  )
  return (
    <Box>
      <Header getImages={ getImages } onSearchChange={ (text) => setSearchText(text) } />
      <ImageGrid images={ filteredImages } getImages={ getImages } />
    </Box>
  )
}

export default App
