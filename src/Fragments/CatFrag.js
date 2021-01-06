import React, {useState, useEffect} from 'react';
import { Avatar, Button, Box, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useSelector, useDispatch} from 'react-redux'
import swal from 'sweetalert';
import CatModal from '../Fragments/CatModal'



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
}); 


const CatFrag = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const [editid, setEditid] =  useState(null)

  const alldata = useSelector(state=>{
    return state
  })

  useEffect(()=>{
      setData(alldata.categories)
      if(alldata.categories.length != 0){
          setLoading(false)
      }
  })

  const editCategory = (id) =>{
    console.log(id)
    setEditid(id)
    setShow(true)
  }

  const update = () =>{
    setShow(false)
  }


  return (
    <div>
    {show?  
    <Box textAlign="center" p="25px" mt="50px" boxShadow="2" borderRadius="6px">
        <TextField
          // onChange={e => hemail(e)}
          value={editid}
          color="secondary" size="small" id="outlined-basic" label="Name" variant="outlined" fullWidth margin="normal" />
         
          <br/>
          <br/>
          <Button onClick={()=>update()} variant="contained" color="primary" fullWidth>
              Update
          </Button>
    </Box> :
    <TableContainer component={Paper}>
      {loading? "Loading..." : 
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Image</TableCell>
            <TableCell align="left">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                <Avatar alt="Remy Sharp" src={row.pic} />
              </TableCell>
              <TableCell align="left">
                <Button variant="outlined" color="primary" onClick={()=> editCategory(row.name)}>EDIT</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> }
    </TableContainer>
    } 
    </div>
  );
}

export default CatFrag