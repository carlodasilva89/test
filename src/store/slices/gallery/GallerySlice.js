import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  images: [] 
}
export const gallerySlice = createSlice({
  name: 'gallery',
  initialState:initialState,
  reducers: {
    setImages: (state, action) => {
        state.images = action.payload
    },
    resetGallery: () => {
      return {
        ...initialState
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setImages, resetGallery } = gallerySlice.actions