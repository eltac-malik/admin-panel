import {createSlice} from '@reduxjs/toolkit'

const filterSlice = createSlice(
    {
        name:"filter",
        initialState:
        {
            basket:[],
            open:0
        },
        reducers:{
            setBasket:(state:any,action)=>
            {
                state.basket = [...state.basket,action.payload]
            },
            resetBasket:(state:any,action)=>
            {
                state.basket = action.payload
            },
            setOpen:(state:any,action)=>
            {
                state.open = action.payload
            },
            changeCount:(state:any,action)=>
            {
                let x = state.basket.find((e:any)=> e.id== action.payload.id)
                state.basket = [...state.basket.filter((e:any)=> e.id!== action.payload.id),{...x,basketCount:action.payload.count}]
            }

        }
    }
)

export default filterSlice.reducer
export const {setBasket,setOpen,resetBasket,changeCount} = filterSlice.actions