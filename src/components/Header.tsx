import { AppBar, Button, Toolbar, Snackbar, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { postImage } from '../store'
import { useState } from 'react'

interface HeaderProps {
  onSearchChange: (text: string) => void,
  getImages: () => void
}

export const Header = ({ onSearchChange, getImages }: HeaderProps) => {
  const [snackbarInfo, setSnackbarInfo] = useState<{ open: boolean, message: string }>({
    open: false,
    message: '',
  })

  // Styling to allow file input to hide inside of upload button
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  })

 const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
   const file = event.target.files?.[0]
    if (file) {
      try {
        await postImage(file)
        setSnackbarInfo({ open: true, message: 'Image uploaded successfully' })
        getImages()
      } catch (error) {
        console.error('Error uploading image:', error)
        setSnackbarInfo({ open: true, message: 'Error uploading image' })
      }
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarInfo({ open: false, message: '' })
  }

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor:"white", height:"60px" }}
    >
      <Toolbar 
        variant="dense"
        sx={{ display:"flex", justifyContent:"space-between", marginTop:"6px" }}
      >
        <TextField
          variant="outlined"
          label="Search Images..."
          size="small"
          onChange={ (e) => onSearchChange(e.target.value) }
        />
        <Button
          component="label"
          variant="outlined"
          endIcon={ <CloudUploadIcon /> }
        >
          UPLOAD
          <VisuallyHiddenInput type="file" accept="image/*"
          onChange={ handleFileUpload }
          // Create aria label for screen readers
          id="file-upload-label"
        />
        </Button>
      </Toolbar>
      <Snackbar
        open={ snackbarInfo.open }
        autoHideDuration={6000}
        onClose={ handleCloseSnackbar }
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={ snackbarInfo.message }
        ContentProps={{
        sx: {
          display: 'block',
          textAlign: "center"
        }
      }}
      />
    </AppBar>
  )
}