import { Avatar, Box, Button, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import { db, storage } from '../config';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },

  input: {
    display: 'none',      
  },
}); 


const CatFrag = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const [editid, setEditid] =  useState(null)
  const [pic, setPic] = useState()
  const [cname, setCname] = useState()
  const alldata = useSelector(state=>{
    return state
  })

  useEffect(()=>{
      setData(alldata.categories)
      console.log(alldata.categories)
      if(alldata.categories.length != 0){
          setLoading(false)
      }
  })

  const editCategory = (id, nname, picnow) =>{
    console.log(id)
    setEditid(id)
    setPic(picnow)
    setCname(nname)
    setShow(true)
  }

  const editStatus = (status, id) =>{

        
        db.collection('category')
        .doc(id)
        .get()
        .then(documentSnapshot => {
            if(documentSnapshot.data().status == false){
                  db.collection('category')
                  .doc(id)
                  .update({
                      status: true,
                  })
                  .then(() => {
                      swal({
                          title: "Good job!",
                          text: "Category Opened",
                          icon: "success",
                          button: "Ok!",
                        });
                  });
            }else{
                db.collection('category')
                .doc(id)
                .update({
                    status: false,
                })
                .then(() => {
                    swal({
                        title: "Good job!",
                        text: "Category Closed",
                        icon: "success",
                        button: "Ok!",
                    });
                });
            }
        });
  }

  const update = () =>{
    console.log(editid, pic)
    db.collection('category')
        .doc(editid)
        .update({
            name:cname,
            pic:pic,
            status:false,
        })
        .then(() => {
            swal({
                title: "Good job!",
                text: "Category Updated",
                icon: "success",
                button: "Ok!",
              });
        });
    setShow(false)  
  }

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

      const handleImageChange = (e) => {

      const file = e.target.files[0]
      console.log(e.target)
      var storageRef = storage.ref();
      const fileRef = storageRef.child(file.name).put(file);
      fileRef.on('state_changed', function(snapshot){
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, function(error) {
          // Handle unsuccessful uploads
        }, function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          fileRef.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            setPic(downloadURL)
          });
        });

      };


  return (
    <div>
    {show?  
    <Box  p="25px" mt="50px" boxShadow="2" borderRadius="6px">
        <TextField
          onChange={e => setCname(e.target.value)}
          value={cname}
          color="secondary" size="small" id="outlined-basic" label="Name" variant="outlined" fullWidth margin="normal" />

                  <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleImageChange}
                    />

                       <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Upload
                            </Button>
                        </label>
                    

                    <Box p="25px" mt="20px" boxShadow="2" borderRadius="6px">
                      <Avatar alt="Pic" src={pic} />
                    </Box>

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
            <TableCell align="left">Status</TableCell>
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
               <Button variant="outlined" color="primary" onClick={()=> editStatus(row.status, row.key)}> Update</Button>
                
              </TableCell>
              <TableCell align="left">
                <Button variant="outlined" color="primary" onClick={()=> editCategory(row.key, row.name, row.pic)}>EDIT</Button>
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