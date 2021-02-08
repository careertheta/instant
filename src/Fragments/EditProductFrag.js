import { Avatar, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import { db, storage } from '../config';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',      
    },
  }));

const EditProductFrag = () => {

    const classes = useStyles();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(false)
    const [pic, setPic] = useState()
    const [editid, setEditid] =  useState(null)
    const [pname, setPname] =  useState()
    const [catlist, setCatlist] = useState([])
    const [value, setValue] = useState();
    const [sid, setSid] = useState()
    const [nameone, setNameone] = useState("")
    const [nametwo, setNametwo] = useState("")
    const [namethree, setNamethree] = useState("")
    const [priceone, setPriceone] = useState("")
    const [pricetwo, setPricetwo] = useState("")
    const [pricethree, setPricethree] = useState("")

    const alldata = useSelector(state=>{
        return state
    })


    useEffect(()=>{
        // setData(alldata.categories)
        setCatlist(alldata.categories)
        db.collection('products')
                .orderBy('category', 'desc')
                .get()
                .then(querySnapshot => {
                const productTop = [];
                querySnapshot.forEach(documentSnapshot => {
                    productTop.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                console.log(productTop)
                setData(productTop)
                if(productTop.length != 0){
                    setLoading(false)
                }
            });

    }, [])

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
    
        const handleChange = (event) => {
            setValue(event.target.value);
      };
  

    const editProduct = (nname, npic, ncategory, nid, rid, c1name, c1price, c2name, c2price, c3name, c3price) =>{
        console.log(c1name)
        setEditid(nid)
        setPname(nname)
        setPic(npic)
        setValue(ncategory)
        setSid(rid)
        setNameone(c1name)
        setPriceone(c1price)
        setNametwo(c2name)
        setPricetwo(c2price)
        setNamethree(c3name)
        setPricethree(c3price)
        setShow(true)
    }

    const editStatus = (status, id) =>{

        
        db.collection('products')
        .doc(id)
        .get()
        .then(documentSnapshot => {
            if(documentSnapshot.data().status == false){
                  db.collection('products')
                  .doc(id)
                  .update({
                      status: true,
                  })
                  .then(() => {
                      swal({
                          title: "Good job!",
                          text: "Product Opened",
                          icon: "success",
                          button: "Ok!",
                        });
                  });
            }else{
                db.collection('products')
                .doc(id)
                .update({
                    status: false,
                })
                .then(() => {
                    swal({
                        title: "Good job!",
                        text: "Product Closed",
                        icon: "success",
                        button: "Ok!",
                    });
                });
            }
        });
  }

    const updateProduct = () =>{
        // setShow(false)
        db.collection('products')
        .doc(editid)
        .update({
            category: parseInt(value, 10),
            name:pname,
            pic:pic,
            status:true,
            type:{choiceone:{name:nameone, price:priceone}, choicetwo:{name:nametwo, price:pricetwo}, 
              choicethree:{name:namethree, price:pricethree}}
        })
        .then(() => {
            swal({
                title: "Good job!",
                text: "Product Updated",
                icon: "success",
                button: "Ok!",
              });
        });
    }

    return (
        <div>
            {show?  
            <Box  p="25px" mt="50px" boxShadow="2" borderRadius="6px">
                <TextField
                onChange={e => setPname(e.target.value)}
                value={pname}
                color="secondary" size="small" id="outlined-basic" label="Name" variant="outlined" fullWidth margin="normal" />

                <TextField
                // onChange={e => hemail(e)}
                value={sid}
                disabled={true}
                color="secondary" size="small" id="outlined-basic" label="Product ID" variant="outlined" fullWidth margin="normal" />

                
                <TextField
                onChange={e => setValue(e.target.value)}
                value={value}
                color="secondary" size="small" id="outlined-basic" label="category ID" variant="outlined" fullWidth margin="normal" />

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


                    <Box p="25px" mt="20px" boxShadow="2" borderRadius="6px">
                        CHOICE ONE 

                        <TextField
                            onChange={e => setNameone(e.target.value)}
                            value={nameone}
                            color="secondary" size="small" id="dch"  label="Sub Name" variant="outlined" fullWidth margin="normal" />

                        <TextField
                            onChange={e => setPriceone(e.target.value)}
                            value={priceone}
                            color="secondary" size="small" id="dch"  label="Price" variant="outlined" fullWidth margin="normal" />
                           
                    <br/> 
                    <br/>
                    </Box>

                    <Box p="25px" mt="20px" boxShadow="2" borderRadius="6px">
                        CHOICE TWO

                        <TextField
                            onChange={e => setNametwo(e.target.value)}
                            value={nametwo}
                            color="secondary" size="small" id="dch"  label="Sub Name" variant="outlined" fullWidth margin="normal" />

                        <TextField
                            onChange={e => setPricetwo(e.target.value)}
                            value={pricetwo}
                            color="secondary" size="small" id="dch"  label="Price" variant="outlined" fullWidth margin="normal" />
                           
                    <br/> 
                    <br/>
                    </Box>

                    <Box p="25px" mt="20px" boxShadow="2" borderRadius="6px">
                        CHOICE THREE

                        <TextField
                            onChange={e => setNamethree(e.target.value)}
                            value={namethree}
                            color="secondary" size="small" id="dch"  label="Sub Name" variant="outlined" fullWidth margin="normal" />

                        <TextField
                            onChange={e => setPricethree(e.target.value)}
                            value={pricethree}
                            color="secondary" size="small" id="dch"  label="Price" variant="outlined" fullWidth margin="normal" />
                           
                    <br/> 
                    <br/>
                    </Box>

                    <br/>
                  <Button onClick={()=> updateProduct()} variant="contained" color="primary" fullWidth>
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
                {data.map((row, index) => {

                    if(row.status == true){
                    return( 
                        <TableRow key={index}>
                        <TableCell component="th" scope="row">
                            {row.category}) {row.name}
                        </TableCell>
                        <TableCell align="right">
                            <Avatar alt="Remy Sharp" src={row.pic} />
                        </TableCell>
                        <TableCell align="left" style={{backgroundColor:"green"}}>
                        <Button variant="outlined" color="secondary" onClick={()=> editStatus(row.status, row.key)}> Update</Button>
                            
                        </TableCell>
                        <TableCell align="left">
                            <Button variant="outlined" color="primary" onClick={()=> 
                                editProduct(row.name, row.pic, row.category, row.key, 
                                row.id, row.type.choiceone.name,  row.type.choiceone.price,
                                row.type.choicetwo.name,  row.type.choicetwo.price,
                                row.type.choicethree.name,  row.type.choicethree.price)}>EDIT</Button>
                        </TableCell>
                        </TableRow>
                    )
                }else{
                    return( 
                        <TableRow key={index}>
                        <TableCell component="th" scope="row">
                           {row.category}) {row.name}
                        </TableCell>
                        <TableCell align="right">
                            <Avatar alt="Remy Sharp" src={row.pic} />
                        </TableCell>
                        <TableCell align="left" style={{backgroundColor:"red"}}>
                        <Button variant="outlined" color="secondary" onClick={()=> editStatus(row.status, row.key)}> Update</Button>
                            
                        </TableCell>
                        <TableCell align="left">
                            <Button variant="outlined" color="primary" onClick={()=> 
                                editProduct(row.name, row.pic, row.category, row.key, 
                                row.id, row.type.choiceone.name,  row.type.choiceone.price,
                                row.type.choicetwo.name,  row.type.choicetwo.price,
                                row.type.choicethree.name,  row.type.choicethree.price)}>EDIT</Button>
                        </TableCell>
                        </TableRow>
                    )
                }
                })}
                </TableBody>
            </Table> }
            </TableContainer>
            }
        </div>
    )
}

export default EditProductFrag
