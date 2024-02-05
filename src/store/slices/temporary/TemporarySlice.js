import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    temporaryPaymentSelected:[], 
    temporarySelectionOtherBank: false,
    temporarySelectPositiveBalance: false,
    temporaryInfoReferencePayment: null,
    temporarySearchCategory: ""
  }

export const temporarySlice = createSlice({
  name: 'temporary',
  initialState:initialState,
  reducers: {
    setTemporaryPaymentSelected: (state, action) => {
        state.temporaryPaymentSelected = action.payload
    },
    setTemporarySelectionOtherBank: (state, action) => {
      state.temporarySelectionOtherBank = action.payload
    },
    setTemporarySelectPositiveBalance: (state, action) => {
      state.temporarySelectPositiveBalance = action.payload
    },
    setTemporaryInfoReferencePayment: (state, action) => {
      state.temporaryInfoReferencePayment = action.payload
    },
    setTemporarySearchCategory: (state, action) => {
      state.temporarySearchCategory = action.payload
    },
    resetTemporary: () => {
      return {
        ...initialState
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const {setTemporaryPaymentSelected, 
  setTemporarySelectionOtherBank, 
  setTemporarySelectPositiveBalance, 
  setTemporaryInfoReferencePayment, 
  setTemporarySearchCategory,
  resetTemporary,
} = temporarySlice.actions