import {configureStore} from '@reduxjs/toolkit'
import filterSlice from './filterSlice'
import basketSlice from './basketSlice'
import toolStatus from './toolStatus'
import addNewOrder from './addNewOrder'
import orderSlice from './orderSlice'

const store = configureStore(
    {
        reducer:{
            filter:filterSlice,
            basket:basketSlice,
            tool:toolStatus,
            order:addNewOrder,
            newOrders:orderSlice
        }
    }
)


export default store