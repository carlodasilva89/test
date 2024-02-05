import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  billing: [] 
}

export const billingSlice = createSlice({
  name: 'billing',
  initialState:initialState,
  reducers: {
    setBilling: (state, action) => {
        state.billing = action.payload
    },
    resetBilling: () => {
      return {
        ...initialState
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setBilling } = billingSlice.actions