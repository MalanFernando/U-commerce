import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action)=>{
            return action.payload
        }
    }
})

export const { setCart } = cartSlice.actions;

export const getCart = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
        .then((res) => dispatch(setCart(res.data.data.cart)))
        .catch(error => {
            if (error.response.status === 404) {
                dispatch(setCart({}));
            }
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export const addProductToCart = (productChoose) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', productChoose, getConfig())
        .then(() => dispatch(getCart()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const removeProductToCart = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
        .then(() => dispatch(getCart()))
        .finally(() => dispatch(setIsLoading(false)));
}

export default cartSlice.reducer;
