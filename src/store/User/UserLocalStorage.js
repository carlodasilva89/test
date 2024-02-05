//User Save data into local storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserSaveStorage = {
    Auth: function (payload) {
        AsyncStorage.setItem('dataAuth', JSON.stringify(payload));
        AsyncStorage.setItem('isAuth', 'true');
    },
    DataUser: function (payload) {
        AsyncStorage.setItem('userData', JSON.stringify(payload));
    },
};

//User Get data from local storage
export const UserGetStorage = {
    Auth: function () {
        if (AsyncStorage.getItem('dataAuth')) {
            return AsyncStorage.getItem('dataAuth')
        }
        return null
    },
    isAuth: function () {
        if (AsyncStorage.getItem('isAuth')) {
            return AsyncStorage.getItem('isAuth')
        }
        return false
    },
    DataUser: function (payload) {
        if (AsyncStorage.getItem('userData')) {
            return AsyncStorage.getItem('userData')
        }
        return null
    },
};

