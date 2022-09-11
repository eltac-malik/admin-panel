import React, { useState } from "react";
import "./Filter.css";
import { useDispatch } from "react-redux";
import { setInput,filterStatus,filterbyRange,filterbyCount} from "../../redux/filterSlice";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {Link} from 'react-router-dom'

function Filter() {

  let search_btn = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.24443 14.483C8.8533 14.483 10.4161 13.9462 11.6854 12.9576L16.474 17.7462C16.8317 18.0917 17.4017 18.0818 17.7472 17.724C18.0842 17.3751 18.0842 16.8219 17.7472 16.473L12.9586 11.6844C15.4118 8.5265 14.8406 3.97782 11.6827 1.52464C8.52475 -0.928536 3.97612 -0.357275 1.52294 2.80063C-0.930245 5.95854 -0.358984 10.5072 2.79892 12.9604C4.07027 13.948 5.63451 14.4838 7.24443 14.483ZM3.39686 3.3958C5.52184 1.27078 8.96711 1.27074 11.0921 3.39572C13.2171 5.5207 13.2172 8.96597 11.0922 11.091C8.96723 13.216 5.52196 13.216 3.39694 11.0911C3.3969 11.091 3.3969 11.091 3.39686 11.091C1.27188 8.98149 1.25936 5.54878 3.36886 3.4238C3.37818 3.41444 3.3875 3.40512 3.39686 3.3958Z"
        fill="#A0A7B3"
      />
    </svg>
  );
  let filter_icon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6667 20C11.4864 20 11.3109 19.9415 11.1667 19.8333L7.83333 17.3333C7.72983 17.2557 7.64583 17.1551 7.58797 17.0393C7.53012 16.9236 7.5 16.796 7.5 16.6667V11.9833L1.65333 5.40583C1.2381 4.9374 0.966979 4.35901 0.872563 3.7402C0.778147 3.12138 0.86445 2.48846 1.1211 1.91751C1.37775 1.34656 1.79382 0.861882 2.31931 0.521721C2.8448 0.181561 3.45735 0.000395349 4.08333 0L15.9167 0C16.5426 0.000734209 17.155 0.182199 17.6803 0.522589C18.2055 0.862978 18.6214 1.34781 18.8777 1.91882C19.1341 2.48983 19.2201 3.12273 19.1255 3.74146C19.0308 4.36018 18.7595 4.93841 18.3442 5.40667L12.5 11.9833V19.1667C12.5 19.3877 12.4122 19.5996 12.2559 19.7559C12.0996 19.9122 11.8877 20 11.6667 20ZM9.16666 16.25L10.8333 17.5V11.6667C10.8335 11.4626 10.9085 11.2657 11.0442 11.1133L17.1008 4.29917C17.3028 4.0709 17.4346 3.7892 17.4804 3.48788C17.5262 3.18655 17.484 2.87842 17.359 2.60046C17.2339 2.32251 17.0313 2.08655 16.7755 1.92091C16.5197 1.75527 16.2214 1.66699 15.9167 1.66667H4.08333C3.77871 1.66713 3.48068 1.75546 3.225 1.92105C2.96932 2.08665 2.76684 2.3225 2.64184 2.60029C2.51684 2.87809 2.47463 3.18605 2.52027 3.48723C2.56591 3.78842 2.69747 4.07004 2.89916 4.29833L8.95666 11.1133C9.09201 11.2659 9.16673 11.4627 9.16666 11.6667V16.25Z"
        fill="#7C818D"
      />
    </svg>
  );
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

  const dispatch = useDispatch();
  const [show, setShow] = useState("open");
  const [count, setCount] = useState("");
  const [status, setStatus] = useState("");
  const [range, setRange] = useState("");

  const handleShow = () => {
    show === "open" ? setShow("close") : setShow("open");
  };
  const handleReset = ()=>
  {
    dispatch(filterbyCount(0)) 
    dispatch(filterStatus(3))
    dispatch(filterbyRange(0))
    setCount("")
    setStatus('')
    setRange('')
  }

  const handleChangeCount = (event: SelectChangeEvent) => {
    setCount(event.target.value as string);
    dispatch(filterbyCount(event.target.value))
  };
  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
    dispatch(filterStatus(event.target.value))
  };
  const handleChangeRange = (event: SelectChangeEvent) => {
    setRange(event.target.value as string);
    dispatch(filterbyRange(event.target.value))
  };

  return (
    <div className="filter">
      <h1 className="bill-title">Qaimələr</h1>
      <div className="fill">
        <div className="input-div">
          <div className="search-btn">{search_btn}</div>
          <input
            onChange={(e) => dispatch(setInput(e.target.value))}
            type="text"
            placeholder="Qaimə nömrəsi, müştəri adi üzrə axtar"
          />
        </div>
        <div className="operations">
          {show != 'open'&&<p onClick={()=> handleReset()} className='reset'>sıfırla</p>}
          <div onClick={() => handleShow()} className="filter-item">
            <p>{filter_icon}</p>
            <p className="fltr">Filter</p>
          </div>
          <Link to='/add' className="link add-new">
            <p>{plus}</p>
            <p className="new">Yeni qaimə</p>
          </Link>
        </div>
      </div>
      <div className={`advanced-filter ${show}`}>
          <div className="box-drop">
            <p>Məhsul sayı</p>
          <Box className='drop-box' sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Seç</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={count}
                label="Age"
                onChange={handleChangeCount}
              >
              <MenuItem value={0}>Hamı</MenuItem>
                <MenuItem value={1}>1-5</MenuItem>
                <MenuItem value={2}>5-10</MenuItem>
                <MenuItem value={3}>10-20</MenuItem>
                <MenuItem value={4}>20-20+</MenuItem>
              </Select>
            </FormControl>
          </Box>
          </div>


          <div className="box-drop spec">
            <p>Məbləğ aralığı</p>
          <Box className='drop-box spec x'  sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Seç</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={range}
                label="Age"
                onChange={handleChangeRange}
              >
                <MenuItem value={0}>Hamı</MenuItem>
                <MenuItem value={1}>$1-$50</MenuItem>
                <MenuItem value={2}>$50-$1500</MenuItem>
                <MenuItem value={3}>$1500+</MenuItem>
              </Select>
            </FormControl>
          </Box>
          </div>

          <div className="box-drop">
            <p>Status</p>
          <Box className='drop-box' sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Seç</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleChangeStatus}
              >
                <MenuItem value={3}>Hamı</MenuItem>
                <MenuItem value={1}>Təstiqlənib</MenuItem>
                <MenuItem value={0}>Gözləyir</MenuItem>
                <MenuItem value={2}>Xitam olunub</MenuItem>
              </Select>
            </FormControl>
          </Box>
          </div>
      </div>
    </div>
  );
}

export default Filter;
