import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
        increment: (state)=> { return state + 1},
        decrement: (state)=> {return state -1},
        setCounter: (state, action) =>{
            return action.payload
        }
    }
})

export const { increment, decrement, setCounter } = counterSlice.actions;

export default counterSlice.reducer;
