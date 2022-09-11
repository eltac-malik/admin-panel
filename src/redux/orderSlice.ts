import {createSlice} from '@reduxjs/toolkit'

const orderSlice = createSlice(
    {
        name:"filter",
        initialState:
        {
            orders:[]
        },
        reducers:{
            setNewOrders:(state:any,action)=>
            {
                state.orders = action.payload
            },

        }
    }
)

export default orderSlice.reducer
export const {setNewOrders} = orderSlice.actions