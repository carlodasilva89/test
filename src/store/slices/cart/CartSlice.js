import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [],
    quantityModal: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            //ITEM OBJECT
            const itemInCart = state.cart.find((item) => item.product_id === action.payload.product_id);
            if (itemInCart) {
                itemInCart.quantity_cart++;
            } else {
                state.cart.push({ ...action.payload, quantity_cart: 1 });
            }
        },
        incrementQuantity: (state, action) => {
            //PRODUCT ID
            const item = state.cart.find((item) => item.product_id === action.payload);
            item.quantity_cart++;
        },
        decrementQuantity: (state, action) => {
            //PRODUCT ID
            const item = state.cart.find((item) => item.product_id === action.payload);
            if (item.quantity_cart === 1) {
                const removeItem = state.cart.filter((item) => item.product_id !== action.payload);
                state.cart = removeItem;
            } else {
                item.quantity_cart--;
            }
            /*
            if (item.quantity_cart === 1) {
                item.quantity_cart = 1
            } else {
                item.quantity_cart--;
            }
            */
        },
        removeItem: (state, action) => {
            const removeItem = state.cart.filter((item) => item.product_id !== action.payload);
            state.cart = removeItem;
        },
        removeAllItems: (state) => {
            state.cart = []
        },
        resetCart: () => {
            return {
                ...initialState
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToCart, incrementQuantity, decrementQuantity, removeItem, removeAllItems, resetCart } = cartSlice.actions