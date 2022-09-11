import * as React from 'react';
import {useState,useEffect} from 'react'
import './Table.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import Tooltip from '../Tooltip/Tooltip'
import {setNewOrders} from '../../redux/orderSlice'
import {useSelector,useDispatch} from 'react-redux'



function BasicTable(props:any) {

    interface Orders {
      id:number,
      orderId:number
      user:any,
      products:any,
      sum:number,
      status:number
    }
    const [allorders,setAllOrders] = useState<Orders[]>([])
    const [open,setOpen] = useState(0)
    const dispatch = useDispatch();

    useEffect(()=>
    {
        axios.get("http://localhost:3500/orders")
        .then(resp=> 
          {
            setAllOrders(resp.data)
            props.setPages(Math.ceil(resp.data.length/6))
          })
    },[])

    useEffect(()=>
    {
      dispatch(setNewOrders(allorders)) 
    },[allorders])


    const orders:any = useSelector<any>(state => state.newOrders.orders)

    

    const handleFunc = (e:number)=>{e===open?setOpen(0):setOpen(e)}

    const inp = useSelector((state:any) => state.filter.input)
    const statusCode = useSelector((state:any) => state.filter.status)
    const range = useSelector((state:any) => state.filter.range)
    const count = useSelector((state:any) => state.filter.count)

    useEffect(()=>
    {
      
      console.log(data.slice((props.current - 1) * 6, (props.current * 6)));
      
    },[props.current])
    console.log(orders);
    
    let y = orders&&orders.filter((e:any)=>
      {if (inp=='') {return e}else if(e.user.user.toLowerCase().includes(inp.toLowerCase())||String(e.orderId).includes(inp)){return e}})

      let x = y.filter((e:any)=>{if(statusCode==3){return e}else if(e.status==statusCode){return e}})

        let forRange = x.filter((e:any)=>
          {
            
            if (range==0){ return e  }
            else if(range==1)
            {
              return e.sum<50
            }
            else if(range==2)
            {
              return e.sum>50&&e.sum<1500
            }
            else
            {
              return e.sum>1500
            }
          })

          let data = forRange.filter((e:any)=>
            {
              if (count==0){ return e}
              else if(count==1)
              {
                return e.products.length<5
              }
              else if(count==2)
              {
                return e.products.length>5&&e.products.length<10
              }
              else if(count==3)
              {
                return e.products.length>10&&e.products.length<20
              }
              else
              {
                return e.products.length>20
              }
            })
           

  return (
    <TableContainer className='table' component={Paper}>
      <Table  sx={{ minWidth: 700 }} aria-label="simple table">
        <TableHead className='head'>
          <TableRow>
            <TableCell>Qaimə No</TableCell>
            <TableCell align="center">Müştəri</TableCell>
            <TableCell align="center">Məhsul sayı</TableCell>
            <TableCell align="center">Toplam məbləğ</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Əmrlər </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice((props.current - 1) * 6, (props.current * 6)).map((e:any) => (
            <TableRow
              key={e.orderId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {e.orderId}
              </TableCell>
              <TableCell className='cell cell-name' align="center"><p className='for-img'><p className='table-img'><img src={e.user.userImg} alt=""/></p><p className='user-name'>{e.user.user}</p></p></TableCell>
              <TableCell className='cell' align="center">{e.products.length}</TableCell>
              <TableCell className='cell' align="center">$ {e.sum}</TableCell>
              <TableCell className='cell cells' align="center">{e.status===1? <p className='succes'>təstiqlənib</p>:(e.status===0?<p className='wait'>gözləyir</p>:<p className='reject'>xitam olunub</p>)}</TableCell>
              <TableCell className='cell tool' align="center">{e.orderId===open&&<Tooltip id={e.id}/>}<i onClick={()=> handleFunc(e.orderId)} className="fa-regular fa-ellipsis-vertical"></i></TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default BasicTable