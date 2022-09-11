import {createSlice} from '@reduxjs/toolkit'

const orderSlice = createSlice(
    {
        name:"filter",
        initialState:
        {
            addOrder:{},
            currentUser:null
        },
        reducers:{
            setOrder:(state:any,action)=>
            {
                state.addOrder = action.payload
            },
            setCurrentUserRtk:(state:any,action)=>
            {
                state.currentUser = action.payload
            }

        }
    }
)

export default orderSlice.reducer
export const {setOrder,setCurrentUserRtk} = orderSlice.actions