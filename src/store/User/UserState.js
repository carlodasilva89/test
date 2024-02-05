import React, { useReducer } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'
import { UserGetStorage } from './UserLocalStorage'
import PropTypes from 'prop-types'

const UserState = (props) => {
    const initialState = {
        isAuth: UserGetStorage.isAuth(),
        dataAuth: UserGetStorage.Auth(),
        userData: UserGetStorage.DataUser()
    }

    const [state, dispatch] = useReducer(UserReducer, initialState)

    const userAuth = async (res) => {
        dispatch({
            type: 'AUTH_USER',
            payload: res
        })
    }

    const dataUser = async (res) => {
        dispatch({
            type: 'DATA_USER',
            payload: res
        })
    }

    const userLogout = async () => {
        dispatch({
            type: 'LOGOUT_USER'
        })
    }

    return (
        <UserContext.Provider value={{
            dataAuth: state.dataAuth,
            isAuth: state.isAuth,
            userData: state.userData,
            userAuth,
            dataUser,
            userLogout
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

UserState.propTypes = {
    children: PropTypes.node
  }

export default UserState;