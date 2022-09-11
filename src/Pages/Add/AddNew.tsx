import React,{useState,useEffect} from 'react'
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import {setBasket} from '../../redux/basketSlice'
import {setCurrentUserRtk} from '../../redux/addNewOrder'
import './style/AddNew.css'

function AddNew() {
  const x = useSelector<any,any>(state=> state.basket.basket)
  let plus = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6667 6.66667H9.33333V1.33333C9.33333 0.979711 9.19286 0.640573 8.94281 0.390525C8.69276 0.140476 8.35362 0 8 0C7.64638 0 7.30724 0.140476 7.05719 0.390525C6.80714 0.640573 6.66667 0.979711 6.66667 1.33333V6.66667H1.33333C0.979711 6.66667 0.640573 6.80714 0.390525 7.05719C0.140476 7.30724 0 7.64638 0 8C0 8.35362 0.140476 8.69276 0.390525 8.94281C0.640573 9.19286 0.979711 9.33333 1.33333 9.33333H6.66667V14.6667C6.66667 15.0203 6.80714 15.3594 7.05719 15.6095C7.30724 15.8595 7.64638 16 8 16C8.35362 16 8.69276 15.8595 8.94281 15.6095C9.19286 15.3594 9.33333 15.0203 9.33333 14.6667V9.33333H14.6667C15.0203 9.33333 15.3594 9.19286 15.6095 8.94281C15.8595 8.69276 16 8.35362 16 8C16 7.64638 15.8595 7.30724 15.6095 7.05719C15.3594 6.80714 15.0203 6.66667 14.6667 6.66667Z"
        fill="white"
      />
    </svg>
  );

    interface Users
    {
        user:string,
        userImg:string
    }
    interface Products
    {
        name:string,
        count:number,
        price:number
    }
    
    const [users,setUsers] = useState<Users[]>([])
    const [currentUser,setCurrentUser] = useState<any>('')
    const [currentProduct,setCurrentProduct] = useState('')
    const [products,setProducts] = useState<Products[]>([])
    const [orders,setOrders] = useState<any>([])

    const dispatch = useDispatch()
    
    useEffect(()=>
    {
        axios.get('http://localhost:3500/users')
        .then(resp=> setUsers(resp.data))
    },[])
    useEffect(()=>
    {
        axios.get('http://localhost:3500/products')
        .then(resp=> setProducts(resp.data))
    },[])


    const handleSelectUser = (event: SelectChangeEvent) => {
        setCurrentUser(event.target.value as string);
        let x = users.find(e=> e.user==event.target.value)
        console.log(x);
        
        dispatch(setCurrentUserRtk(x))
      };

      const handleSelectProduct = (event: SelectChangeEvent) => {
        setCurrentProduct(event.target.value as string);
      };
    
    return (
        <div className="add-content">
            

        <div className="box-size">
            <div className="box-drop drop-x">
            <p>Müştəri</p>
          <Box className='drop-box' sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Seç</InputLabel>
              <Select
               className='add-form' 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentUser}
                label="Age"
                onChange={handleSelectUser}
              >
                  {
                      users.map(e=>
                        {
                            return(
                                <MenuItem value={e.user}>{e.user}</MenuItem>
                            )
                        })
                  }
              </Select>
            </FormControl>
          </Box>
          </div>
       </div>



            <div className="box-size">
          <div className="box-drop drop-x ">
            <p>Məhsul</p>
          <Box className='drop-box' sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Seç</InputLabel>
              <Select
               className='add-form' 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentProduct}
                label="Age"
                onChange={handleSelectProduct}
              >
                  {
                      products.map(e=>
                        {
                            return(
                                <MenuItem className='menuItem' value={e.name}><p>{e.name}</p></MenuItem>
                            )
                        })
                  }
              </Select>
            </FormControl>
          </Box>
          </div>
       </div>


       <div onClick={()=>
      {
       let current =  products.find(e=> e.name===currentProduct)
        dispatch(setBasket({...current,basketCount:1}))
      }} className="btn-add">{plus} </div>

        </div>
    )
}

export default AddNew
