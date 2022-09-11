import React,{useState} from 'react'
import Profile from '../Profile/Profile'
import './Main.css'
import Table from '../Table/Table'
import Filter from '../Filter/Filter'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Pagenation from '../Pagenation/Pagenation'

function Main() {

    const [pages,setPages] = useState(4) 
    const [current,setCurrent] = useState(1) 

    return (
        <div className='main'>
            <Profile/>
            <div className="content">
            <Filter/>
            <Table current={current} pages={pages} setPages={setPages}/>
            </div>
            <Pagenation current={current} pages={pages} setCurrent={setCurrent}/>
        </div>
    )
}

export default Main
