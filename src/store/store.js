import { userSlice } from './slices/user'
import { cartSlice } from './slices/cart/CartSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import { createStore } from 'redux'
import { combineReducers } from 'redux'
import { dateSlice } from './slices/date/DateSlice';
import { billingSlice } from './slices/billing/BillingSlice';
import { gallerySlice } from './slices/gallery/GallerySlice';
import { temporarySlice } from './slices/temporary/TemporarySlice'

const rootReducer = combineReducers({
    user: userSlice.reducer,
    cart: cartSlice.reducer,
    shippingdate: dateSlice.reducer,
    billing: billingSlice.reducer,
    gallery: gallerySlice.reducer,
    temporary: temporarySlice.reducer
})

const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)