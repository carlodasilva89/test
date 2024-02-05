import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState:{
    isAuth: false,
    dataUser: [],
    authUser: []
  },
  reducers: {
    
    setAuthUser: (state, action) => {
        //pass data auth, token
        state.authUser = action.payload

        //change boolean to true 
        state.isAuth = true
    },
    setDataUser: (state, action) => {
        state.dataUser = action.payload
    },
    logoutUser: (state) => {
        state.isAuth = false,
        state.dataUser = []
        state.authUser = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAuthUser, setDataUser, logoutUser } = userSlice.actions