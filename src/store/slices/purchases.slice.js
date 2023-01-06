import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';
import axios from 'axios';
import { setCart } from './cart.slice';

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (state, action) =>{
            return action.payload
        }
    }
})

export const { setPurchases } = purchasesSlice.actions;

export const getPurchases = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api.academlo.tech/api/v1/purchases', getConfig())
        .then((res) => dispatch(setPurchases(res.data.data.purchases)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addPurchases = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api.academlo.tech/api/v1/purchases', {}, getConfig())
        .then(() => {
            dispatch(setCart([]))
            dispatch(getPurchases())
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export default purchasesSlice.reducer;
