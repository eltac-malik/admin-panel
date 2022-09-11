import React,{useState} from 'react'
import './style/Add.css'
import {Link} from 'react-router-dom'
import AddNew from './AddNew'
import AddTable from './AddTable'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {resetBasket} from '../../redux/basketSlice'

function Add() {
    const dispatch = useDispatch()
    const basket = useSelector<any,any>(state => state.basket.basket)
    const currentUser = useSelector<any>(state => state.order.currentUser)
    const navigate = useNavigate()


        
    let sumall=0;
    basket.length&&basket.forEach((e:any) => {
        sumall=sumall+(e.basketCount*e.price)
    });


    const handleDb=()=>
    {
        let x:any =
        {
            id:Number((Math.random()*100).toFixed(0)),
            orderId:(Math.random()*100).toFixed(0),
            user:currentUser,
            products:basket,
            status:0,
            sum:sumall
        }

        axios.post("http://localhost:3500/orders",x)
        .then(resp=> {
            if (resp.status==201)
            {
                dispatch(resetBasket([]))  
                navigate('/')  
            }
        }
        )
        
    }

    return (
        <div className='add'>
            <div className="add-title">
                <h1>Qaimə</h1>
                <Link to='/' className='link'><i className="fa-regular fa-xmark"></i></Link>
            </div>
            <AddNew/>
                     

         <AddTable/>
        <div className="all-sum">
            <h1>Toplam : <span>${sumall}</span></h1>
        </div>
        <div className="add-operation">
            <p></p>
            <div className="add-opers">
                <p className='cancel'>Imtina et</p>
                <p onClick={()=> handleDb()} className='save' >Yadda saxla</p>
            </div>
        </div>

        </div>
    )
}

export default Add
