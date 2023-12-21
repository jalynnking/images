// ImageGrid.tsx
import React, { useState } from 'react'
import * as mui from '@mui/material'
import { Images, deleteImage } from '../store'
import DeleteIcon from '@mui/icons-material/Delete'

interface ImageGridProps {
  images: Images[]
  getImages: () => void
}

export const ImageGrid = ({ images, getImages }: ImageGridProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const isSmallScreen = mui.useMediaQuery('(max-width:1100px)')


  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

   const handleDelete = async (filename: string) => {
    await deleteImage(filename)
    getImages()
  }

  const constructImagePath = (relativePath: string | undefined) => {
    const serverUrl = 'http://localhost:3001'
    return `${serverUrl}${relativePath}`
  }

  return (
    <mui.Box style={{ marginTop: '70px' }}>
      <mui.Grid container spacing={2}>
        <mui.Grid item xs={12}>
          <mui.Typography>{images.length} images</mui.Typography>
        </mui.Grid>
        {images.length === 0 ? (
          <mui.Grid item xs={12} display="flex" justifyContent="center">
            <mui.Typography>There are no images to display</mui.Typography>
          </mui.Grid>
        ) : (
          images.map((image, index) => (
            <mui.Grid
              key={index}
              item
              xs={12}
              md={6}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              sx={{ position: 'relative' }}
            >
              <img
                src={constructImagePath(image.path)}
                alt={`Image ${index}`}
                style={{ width: '100%', height: '500px', objectFit: 'cover' }}
              />
              {(hoveredIndex === index || isSmallScreen) && (
                <mui.Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px',
                  }}
                >
                  <mui.Typography>{image.filename}</mui.Typography>
                  <mui.IconButton onClick={() => handleDelete(image.filename)} sx={{marginRight:"30px"}}>
                    <DeleteIcon />
                  </mui.IconButton>
                </mui.Box>
              )}
            </mui.Grid>
          ))
        )}
      </mui.Grid>
    </mui.Box>
  )
}
