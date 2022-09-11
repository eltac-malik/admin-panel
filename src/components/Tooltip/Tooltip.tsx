import React,{useState,useEffect} from 'react'
import './Tooltip.css'
import Status from './ToolStatus'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {setNewOrders} from '../../redux/orderSlice'

function Tooltip(id:any) {
    let edit = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.0442 0.956628C18.4776 0.390959 17.7098 0.0732422 16.9092 0.0732422C16.1086 0.0732422 15.3407 0.390959 14.7742 0.956628L1.22085 14.51C0.832722 14.8959 0.524981 15.355 0.315428 15.8606C0.105874 16.3663 -0.00133165 16.9084 1.24844e-05 17.4558V19.1666C1.24844e-05 19.3876 0.0878099 19.5996 0.24409 19.7559C0.40037 19.9122 0.612332 20 0.833346 20H2.54418C3.09148 20.0015 3.63365 19.8945 4.13931 19.6851C4.64496 19.4756 5.10406 19.168 5.49001 18.78L19.0442 5.22579C19.6096 4.65929 19.9271 3.8916 19.9271 3.09121C19.9271 2.29082 19.6096 1.52313 19.0442 0.956628ZM4.31168 17.6016C3.84168 18.0685 3.20665 18.3314 2.54418 18.3333H1.66668V17.4558C1.66584 17.1274 1.73014 16.8021 1.85588 16.4987C1.98161 16.1953 2.16628 15.9198 2.39918 15.6883L12.685 5.40246L14.6017 7.31913L4.31168 17.6016ZM17.865 4.04746L15.7767 6.13663L13.86 4.22413L15.9492 2.13496C16.075 2.00938 16.2244 1.90983 16.3887 1.84197C16.553 1.77411 16.7291 1.73929 16.9069 1.73948C17.0847 1.73967 17.2607 1.77488 17.4249 1.8431C17.5891 1.91131 17.7382 2.01119 17.8638 2.13704C17.9893 2.26289 18.0889 2.41225 18.1568 2.57657C18.2246 2.7409 18.2594 2.91698 18.2592 3.09477C18.2591 3.27255 18.2238 3.44856 18.1556 3.61274C18.0874 3.77692 17.9875 3.92605 17.8617 4.05163L17.865 4.04746Z" fill="#5F646E"/>
    </svg>
    let del = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_0_1381)">
    <path d="M17.5 3.33333H14.9167C14.7233 2.39284 14.2115 1.54779 13.4677 0.940598C12.7239 0.333408 11.7935 0.0012121 10.8334 0L9.16669 0C8.20652 0.0012121 7.27612 0.333408 6.53231 0.940598C5.7885 1.54779 5.27677 2.39284 5.08335 3.33333H2.50002C2.27901 3.33333 2.06704 3.42113 1.91076 3.57741C1.75448 3.73369 1.66669 3.94565 1.66669 4.16667C1.66669 4.38768 1.75448 4.59964 1.91076 4.75592C2.06704 4.9122 2.27901 5 2.50002 5H3.33335V15.8333C3.33468 16.938 3.77409 17.997 4.5552 18.7782C5.33632 19.5593 6.39536 19.9987 7.50002 20H12.5C13.6047 19.9987 14.6637 19.5593 15.4448 18.7782C16.226 17.997 16.6654 16.938 16.6667 15.8333V5H17.5C17.721 5 17.933 4.9122 18.0893 4.75592C18.2456 4.59964 18.3334 4.38768 18.3334 4.16667C18.3334 3.94565 18.2456 3.73369 18.0893 3.57741C17.933 3.42113 17.721 3.33333 17.5 3.33333ZM9.16669 1.66667H10.8334C11.3502 1.6673 11.8543 1.82781 12.2764 2.1262C12.6984 2.42459 13.0179 2.84624 13.1909 3.33333H6.80919C6.98217 2.84624 7.3016 2.42459 7.72368 2.1262C8.14575 1.82781 8.64979 1.6673 9.16669 1.66667ZM15 15.8333C15 16.4964 14.7366 17.1323 14.2678 17.6011C13.7989 18.0699 13.1631 18.3333 12.5 18.3333H7.50002C6.83698 18.3333 6.20109 18.0699 5.73225 17.6011C5.26341 17.1323 5.00002 16.4964 5.00002 15.8333V5H15V15.8333Z" fill="#5F646E"/>
    <path d="M8.33333 14.9999C8.55435 14.9999 8.76631 14.9121 8.92259 14.7558C9.07887 14.5996 9.16667 14.3876 9.16667 14.1666V9.16659C9.16667 8.94557 9.07887 8.73361 8.92259 8.57733C8.76631 8.42105 8.55435 8.33325 8.33333 8.33325C8.11232 8.33325 7.90036 8.42105 7.74408 8.57733C7.5878 8.73361 7.5 8.94557 7.5 9.16659V14.1666C7.5 14.3876 7.5878 14.5996 7.74408 14.7558C7.90036 14.9121 8.11232 14.9999 8.33333 14.9999Z" fill="#5F646E"/>
    <path d="M11.6666 14.9999C11.8877 14.9999 12.0996 14.9121 12.2559 14.7558C12.4122 14.5996 12.5 14.3876 12.5 14.1666V9.16659C12.5 8.94557 12.4122 8.73361 12.2559 8.57733C12.0996 8.42105 11.8877 8.33325 11.6666 8.33325C11.4456 8.33325 11.2337 8.42105 11.0774 8.57733C10.9211 8.73361 10.8333 8.94557 10.8333 9.16659V14.1666C10.8333 14.3876 10.9211 14.5996 11.0774 14.7558C11.2337 14.9121 11.4456 14.9999 11.6666 14.9999Z" fill="#5F646E"/>
    </g>
    <defs>
    <clipPath id="clip0_0_1381">
    <rect width="20" height="20" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    let status = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_0_1382)">
    <path d="M15.8333 5V3.33333C15.8333 2.44928 15.4821 1.60143 14.857 0.976311C14.2319 0.35119 13.3841 0 12.5 0L7.5 0C6.61594 0 5.7681 0.35119 5.14298 0.976311C4.51786 1.60143 4.16667 2.44928 4.16667 3.33333V5C3.062 5.00132 2.00296 5.44073 1.22185 6.22185C0.440735 7.00296 0.00132321 8.062 0 9.16667L0 13.3333C0.00132321 14.438 0.440735 15.497 1.22185 16.2782C2.00296 17.0593 3.062 17.4987 4.16667 17.5C4.16667 18.163 4.43006 18.7989 4.8989 19.2678C5.36774 19.7366 6.00363 20 6.66667 20H13.3333C13.9964 20 14.6323 19.7366 15.1011 19.2678C15.5699 18.7989 15.8333 18.163 15.8333 17.5C16.938 17.4987 17.997 17.0593 18.7782 16.2782C19.5593 15.497 19.9987 14.438 20 13.3333V9.16667C19.9987 8.062 19.5593 7.00296 18.7782 6.22185C17.997 5.44073 16.938 5.00132 15.8333 5ZM5.83333 3.33333C5.83333 2.89131 6.00893 2.46738 6.32149 2.15482C6.63405 1.84226 7.05797 1.66667 7.5 1.66667H12.5C12.942 1.66667 13.3659 1.84226 13.6785 2.15482C13.9911 2.46738 14.1667 2.89131 14.1667 3.33333V5H5.83333V3.33333ZM14.1667 17.5C14.1667 17.721 14.0789 17.933 13.9226 18.0893C13.7663 18.2455 13.5543 18.3333 13.3333 18.3333H6.66667C6.44565 18.3333 6.23369 18.2455 6.07741 18.0893C5.92113 17.933 5.83333 17.721 5.83333 17.5V14.1667C5.83333 13.9457 5.92113 13.7337 6.07741 13.5774C6.23369 13.4211 6.44565 13.3333 6.66667 13.3333H13.3333C13.5543 13.3333 13.7663 13.4211 13.9226 13.5774C14.0789 13.7337 14.1667 13.9457 14.1667 14.1667V17.5ZM18.3333 13.3333C18.3333 13.9964 18.0699 14.6323 17.6011 15.1011C17.1323 15.5699 16.4964 15.8333 15.8333 15.8333V14.1667C15.8333 13.5036 15.5699 12.8677 15.1011 12.3989C14.6323 11.9301 13.9964 11.6667 13.3333 11.6667H6.66667C6.00363 11.6667 5.36774 11.9301 4.8989 12.3989C4.43006 12.8677 4.16667 13.5036 4.16667 14.1667V15.8333C3.50363 15.8333 2.86774 15.5699 2.3989 15.1011C1.93006 14.6323 1.66667 13.9964 1.66667 13.3333V9.16667C1.66667 8.50362 1.93006 7.86774 2.3989 7.3989C2.86774 6.93006 3.50363 6.66667 4.16667 6.66667H15.8333C16.4964 6.66667 17.1323 6.93006 17.6011 7.3989C18.0699 7.86774 18.3333 8.50362 18.3333 9.16667V13.3333Z" fill="#5F646E"/>
    <path d="M15 8.33325H13.3333C13.1123 8.33325 12.9004 8.42105 12.7441 8.57733C12.5878 8.73361 12.5 8.94557 12.5 9.16659C12.5 9.3876 12.5878 9.59956 12.7441 9.75584C12.9004 9.91212 13.1123 9.99992 13.3333 9.99992H15C15.221 9.99992 15.433 9.91212 15.5893 9.75584C15.7455 9.59956 15.8333 9.3876 15.8333 9.16659C15.8333 8.94557 15.7455 8.73361 15.5893 8.57733C15.433 8.42105 15.221 8.33325 15 8.33325Z" fill="#5F646E"/>
    </g>
    <defs>
    <clipPath id="clip0_0_1382">
    <rect width="20" height="20" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    
  const [show,setShow] = useState(false)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const [orders,setOrdersNew] = useState<any>([])
  const [current,setCurrent] = useState<any>('')

  const handleOpen = () => {setOpen(true)};
  const handleClose = () => setOpen(false);
  const handleOpenEdit = () => {setOpenEdit(true)};
  const handleCloseEdit = () => setOpenEdit(false);

  useEffect(()=>
  {
    axios.get('http://localhost:3500/users')
    .then(resp=> setUsers(resp.data))
  },[])

  useEffect(()=>
  {
      axios.get('http://localhost:3500/orders')
      .then(resp=> setOrdersNew(resp.data))
  },[])

  useEffect(()=>
  {
  setCurrent(orders.find((e:any)=>e.id==id.id))
  console.log(orders.find((e:any)=>e.id==id.id))
  }
  ,[orders])

  




  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    outline:'0',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    p: 4,
    borderRadius:'10px'
  };
  const style2 = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: 'none',
    outline:'0',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    p: 4,
    borderRadius:'10px'
  };

  const handleDelete = ()=>
  {
    
        axios.delete(`http://localhost:3500/orders/${+id.id}`)
       .then(resp=>
         {if (resp.status==200)
         {
         axios.get('http://localhost:3500/orders/').then(resp=> dispatch(setNewOrders(resp.data)))
         
         setOpen(false)
        }}
          )
  }

  
        
  let sumall=0;
  current&&current?.products.forEach((e:any) => {
      sumall=sumall+Number((e.basketCount*e.price))
  });
    
  console.log(current&&current);
  

  const handleRemove=(id:any)=>
  {
    setCurrent({...current, products: current.products.filter((z:any) => z.id !== id)})

  }

    return (
        <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Qaiməni silməyinizə əminsiniz?
            </Typography>
            <div className="deletes">
                <div onClick={handleClose} className="delts del-cancel">İmtina </div>
                <div onClick={handleDelete} className="delts del-okay">Sil </div>
            </div>
          </Box>
        </Modal>



      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
            <h1>Müştəri : {current&&current.user.user}</h1>
            <ul className='edit-ul'>
              {
                current&&current?.products.map((e:any)=> 
                {
                return(
                  <li><p>{e.name}</p> <p>${e.price}</p>
                  <div className="row-func">
                  <button onClick={()=> handleRemove(e.id)}>Sil</button>
                  </div>
                  </li>
                )
                })
              }
            </ul>
              <h1>$ {sumall}</h1>
          <div className="deletes">
              <div onClick={handleCloseEdit} className="delts del-cancel">Geri </div>
              <div  className="delts del-okay">Yadda Saxla</div>
          </div>
        </Box>
      </Modal>

            <p className='tooltip'>
            <p onClick={()=> handleOpenEdit()} className='tool-p edit'><p className='icn'>{edit}</p><p>Düzəliş et</p></p> 
            <p onClick={()=> handleOpen()} className='tool-p delete'><p className='icn'>{del}</p><p>Sil</p></p> 
            <p onClick={()=> show?setShow(false):setShow(true)} className='tool-p change'><p className='icn'>{status}</p><p>Statusu dəyiş</p></p> 
            {show&&<Status  setShow={setShow} id={id}/>}
            <i className="fa-sharp fa-solid fa-caret-right"></i>
            </p>
        </>
    )
}

export default Tooltip
