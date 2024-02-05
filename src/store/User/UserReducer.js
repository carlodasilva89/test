/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import { UserSaveStorage } from './UserLocalStorage'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    AUTH_USER,
    DATA_USER,
    LOGOUT_USER,
} from "../Types";


export default (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case AUTH_USER:
            UserSaveStorage.Auth(payload)
            return {
                ...state,
                isAuth: true,
                dataAuth: payload
            }
        case DATA_USER:
            UserSaveStorage.DataUser(payload)
            return {
                ...state,
                userData: payload
            }
        case LOGOUT_USER:
            AsyncStorage.clear();
            return {
                ...state,
                isAuth: false,
                dataAuth: null,
                userData: null,
                logoutProcess: false
            }
        default : return {}
    }
}


