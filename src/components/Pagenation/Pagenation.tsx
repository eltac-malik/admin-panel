import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function BasicPagination(props:any)
{
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    props.setCurrent(value)
    console.log(value)
  };
  
  return (
      <div className="page">

    <Stack spacing={2}>
      <Pagination onChange={handleChange} page={props.current} count={props.pages}  color="primary" />
    </Stack>
      </div>
  );
}

export default BasicPagination
