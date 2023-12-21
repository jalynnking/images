// ImageGrid.tsx
import { useState } from 'react'
import { Grid, Box, Typography, IconButton, Snackbar, useMediaQuery } from '@mui/material'
import { Image, deleteImage } from '../store'
import DeleteIcon from '@mui/icons-material/Delete'

interface ImageGridProps {
  images: Image[]
  getImages: () => void
}

export const ImageGrid = ({ images, getImages }: ImageGridProps) => {
  const [snackbarInfo, setSnackbarInfo] = useState<{ open: boolean, message: string }>({
    open: false,
    message: '',
  })

  // Handle the checks for hover and small screen, if true for either will show info bar
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
  }
  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }
  const isSmallScreen = useMediaQuery('(max-width:1100px)')

  const handleDelete = async (filename: string) => {
    try {
      await deleteImage(filename)
      setSnackbarInfo({ open: true, message: 'Image deleted successfully' })
      getImages()
    } catch (error) {
        console.error('Error deleting image:', error)
        setSnackbarInfo({ open: true, message: 'Error deleting image' })
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarInfo({ open: false, message: '' })
  }

  // Create path to allow image to work in src
  const constructImagePath = (relativePath: string | undefined) => {
    const serverUrl = 'http://localhost:3001'
    return `${serverUrl}${relativePath}`
  }

  return (
    <Box style={{ marginTop: '70px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>{ images.length === 1 ? (images.length + " image") : (images.length + " images") }</Typography>
        </Grid>
        {images.length === 0 ? (
          <Grid item xs={12} display="flex" justifyContent="center">
            <Typography>There are no images to display</Typography>
          </Grid>
        ) : (
          images.map((image, index) => (
            <Grid
              key={ index }
              item
              xs={12}
              md={6}
              onMouseEnter={ () => handleMouseEnter(index) }
              onMouseLeave={ handleMouseLeave }
              sx={{ position: 'relative' }}
            >
              <img
                src={ constructImagePath(image.path) }
                alt={ image.filename }
                style={{ width: '100%', height: '500px', objectFit: 'cover' }}
              />
              { /* If image is hovered or user is on small screen show info box */ }
              {(hoveredIndex === index || isSmallScreen) && (
                <Box
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
                  <Typography>{image.filename}</Typography>
                  <IconButton onClick={ () => handleDelete(image.filename)} sx={{ marginRight:"30px" } }>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
            </Grid>
          ))
        )}
      </Grid>
      <Snackbar
        open={snackbarInfo.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={snackbarInfo.message}
        ContentProps={{
  sx: {
    display: 'block',
    textAlign: "center"
  }
}}
      />
    </Box>
  )
}
