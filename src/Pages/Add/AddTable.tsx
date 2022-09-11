import * as React from 'react';
import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {changeCount} from '../../redux/basketSlice'
    

function AddTable()
{
const x = useSelector<any,any>(state => state.basket.basket)
const dispatch = useDispatch()

  return (
    <TableContainer className='add-tab' component={Paper}>
      <Table  sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className='head'>
          <TableRow>
            <TableCell align="left">Məhsul adı</TableCell>
            <TableCell align="center">Miqdar</TableCell>
            <TableCell align="center">Qiymət</TableCell>
            <TableCell align="center">Toplam məbləğ</TableCell>
            <TableCell align="center">Əmrlər </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {x&&x.map((z:any) => (
            <TableRow
              key={z.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align="left" scope="row">
                {z.name}
              </TableCell>
              <TableCell align="center">
              <input className='count-inp' value={z.basketCount} onChange={(e:any)=> dispatch(changeCount({id: z.id,  count: e.target.value>1?e.target.value:1}))} type="number"/>
        </TableCell>
              
              <TableCell align="center">$  {z.price}</TableCell>
              
              <TableCell align="center"><p className='bolder'>$ {(z.price*(Number(z.basketCount))).toFixed(1)}</p></TableCell>
              <TableCell align="center"><i className="fa-regular fa-ellipsis-vertical"></i></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



export default AddTable