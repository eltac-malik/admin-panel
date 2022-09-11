import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {setNewOrders} from '../../redux/orderSlice'

function ToolStatus({setOrders,setShow,id,setOpen}:any) {

    
    interface Orders {
        id:number,
        orderId:number
        user:any,
        products:any,
        sum:number,
        status:number
      }
    
    const [allOrder,setAllOrder] = useState<Orders[]>([])
    const dispatch = useDispatch()
    useEffect(()=>
    {
        axios.get("http://localhost:3500/orders")
        .then(resp=> setAllOrder(resp.data))
    },[])
    const [newStatus,setStatus] = useState<any>(null)

    const handleChangeStatus = ()=>
    {
        let currentOrder:any = allOrder.find(e=> e.id==id.id);
        console.log("curr",currentOrder);
        console.log("id",id);
        console.log("all",allOrder);
        
        let x = {...currentOrder,status:newStatus===null?currentOrder.status:newStatus}
        let currentId = currentOrder.id;
        console.log("id->",currentId);
        
        axios.put(`http://localhost:3500/orders/${+currentId}`,x)
        .then(resp=>
            {
             axios.get("http://localhost:3500/orders")
             .then(resp=> dispatch(setNewOrders(resp.data)))   
            })
        setShow(false)
        setOpen(0)
    }


    return (
        <div className='stat'>
            <p className='succ' onClick={()=> setStatus(1)}>təstiqlənib</p>
            <p className='wait' onClick={()=> setStatus(0)}>gözləyir</p>
            <p className='dec' onClick={()=> setStatus(2)}>xitam olunub</p>
            <div className="oprts">
                <p className='op op-x' onClick={()=> setShow(false)}>Imtina</p>
                <p className='op' onClick={()=> handleChangeStatus()}>Təstiqlə</p>
            </div>
        </div>
    )
}

export default ToolStatus
