// Header.test.tsx
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { Header } from '../components/Header'
import * as api from '../store'

describe('Header Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders without crashing', () => {
    render(<Header onSearchChange={() => {}} getImages={() => {}} />)
    expect(screen.getByLabelText('Search Images...')).toBeInTheDocument()
    expect(screen.getByText('UPLOAD')).toBeInTheDocument()
  })

  test('search input works', async () => {
    const onSearchChangeMock = jest.fn()
    render(<Header onSearchChange={onSearchChangeMock} getImages={() => {}} />)

    await act(async () => {
      const searchInput = screen.getByLabelText('Search Images...')
      userEvent.type(searchInput, 'test')
    })

    expect(onSearchChangeMock).toHaveBeenCalledWith('test')
  })

  test('uploads an image successfully', async () => {
    const getImagesMock = jest.fn()
    render(<Header onSearchChange={() => {}} getImages={getImagesMock} />)

    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' })

    const fileInput = screen.getByTestId('file-upload-label')

    const postImageMock = jest.spyOn(api, 'postImage').mockResolvedValueOnce({})

    await act(async () => {
      userEvent.upload(fileInput, file)
    })

    await waitFor(() => {
      expect(getImagesMock).toHaveBeenCalled()
    })

    postImageMock.mockRestore()
  })

  test('displays a snackbar on image upload error', async () => {
    const getImagesMock = jest.fn()
    jest.spyOn(api, 'postImage').mockRejectedValueOnce('error')

    render(<Header onSearchChange={() => {}} getImages={getImagesMock} />)

    const fileInput = screen.getByTestId('file-upload-label')
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' })

    await act(() => {
        userEvent.upload(fileInput,file)
    })
  expect(screen.getByText('Error uploading image')).toBeInTheDocument()
  })
})
