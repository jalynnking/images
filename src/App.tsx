import { useEffect, useState } from 'react'
import { fetchImages, Images } from './store'
import * as mui from '@mui/material'
import { Header } from './components/Header'
import { ImageGrid } from './components/ImageGrid'

function App() {
  const [images, setImages] = useState<Images[]>([])
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
    <mui.Box>
      <Header getImages={getImages} onSearchChange={(text) => setSearchText(text)} />
      <ImageGrid images={filteredImages} getImages={getImages} />
    </mui.Box>
  )
}

export default App
