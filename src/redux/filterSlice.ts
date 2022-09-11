import {createSlice} from '@reduxjs/toolkit'

const filterSlice = createSlice(
    {
        name:"filter",
        initialState:
        {
           input:"" ,
           status:3,
           range:0,
           count:0
        },
        reducers:{
            setInput:(state,action)=>
            {
                state.input = action.payload
            },
            filterStatus:(state,action)=>
            {
                state.status = action.payload
            },
            filterbyRange:(state,action)=>
            {
                state.range = action.payload
            },
            filterbyCount:(state,action)=>
            {
                state.count = action.payload
            }
        }
    }
)

export default filterSlice.reducer
export const {setInput,filterStatus,filterbyRange,filterbyCount} = filterSlice.actions