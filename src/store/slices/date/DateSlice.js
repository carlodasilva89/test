import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  datetime: []
}

export const dateSlice = createSlice({
  name: 'shippingdate',
  initialState: initialState,
  reducers: {
    setDateTime: (state, action) => {
        state.datetime = action.payload
    },
    resetDateTime: () => {
      return {
        ...initialState
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDateTime, resetDateTime } = dateSlice.actions