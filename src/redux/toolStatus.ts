import {createSlice} from '@reduxjs/toolkit'

const toolSlice = createSlice(
    {
        name:"filter",
        initialState:
        {
            newStatus:null
        },
        reducers:{
            setStatus:(state:any,action)=>
            {
                state.newStatus = action.payload
            }

        }
    }
)

export default toolSlice.reducer
export const {setStatus} = toolSlice.actions