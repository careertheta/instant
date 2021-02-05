import { Avatar, Box, Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

const AddProductFrag = () => {

    const alldata = useSelector(state=>{
        return state
    })

    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const [lastid, setLastid] =  useState()
    const [name, setName] = useState("")
    const [nameone, setNameone] = useState("")
    const [nametwo, setNametwo] = useState("")
    const [namethree, setNamethree] = useState("")
    const [priceone, setPriceone] = useState("")
    const [pricetwo, setPricetwo] = useState("")
    const [pricethree, setPricethree] = useState("")
    const [pic, setPic] = useState()
    const [category, setCatgeory] = useState(1);
    const [data, setData] = useState([])
    const [loadingcat, setLoadingcat] = useState(true)
    const [value, setValue] = useState("3Roll");

    useEffect(()=>{
       
        setData(alldata.categories)
        if(alldata.categories.length != 0){
            setLoadingcat(false)
        }

    }, [alldata])

    const handleChange = (event) => {
            setValue(event.target.value);
      };

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

    const submitPro = () =>{

      swal({
        title: "Want to add Product?",
        text: "Once Added, you will not be able to delete the file!",
        icon: "success",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          if(name == "" || priceone == "" || nameone == "" || pic == "" || category == ""){
            swal({
              title: "Empty Fields!",
              text: "Check Empty Fields",
              icon: "warning",
              button: "Ok!",
            });
          }else{
            db.collection('products')
            .orderBy('id', 'desc')
            .limit(1)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {                    
                        db.collection('products')
                        .add({
                          category: parseInt(value.charAt(0), 10),
                          id: documentSnapshot.data().id + 1,
                          name:name,
                          pic:pic,
                          status:true,
                          type:{choiceone:{name:nameone, price:priceone}, choicetwo:{name:nametwo, price:pricetwo}, 
                            choicethree:{name:namethree, price:pricethree}}
                        })
                        .then(() => {
                          swal("Product Added", {
                            icon: "success",
                          });

                          // AFTER SUCCESS MOVE TO ALL PRODUCTS
                          let path = `editproduct`; 
                          history.push(path);
                        });   
                });
            });
          }

        } else {
          swal("No Product Added");
        }
      });
    }

    return (
        <div>
        {loadingcat? "Loading..." :
        
        <div className={classes.root}>
        <TextField
        onChange={e => setName(e.target.value)}
        value={name}
        color="secondary" size="small" id="dch"  label="Product Name" variant="outlined" fullWidth margin="normal" />
        
        <br/>

        <FormLabel component="legend">Category</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        {data.map((row) => (
             <FormControlLabel key={row.id} value={row.id + row.name} control={<Radio />} label={row.name} />
        ))}

       </RadioGroup>

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
        
        <br/>

        <Box p="25px" mt="50px" boxShadow="2" borderRadius="6px">
             <Avatar alt="Pic" src={pic} />
        </Box>

        <br/>
        <Box p="25px" mt="50px" boxShadow="2" borderRadius="6px">
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

        <Box p="25px" mt="50px" boxShadow="2" borderRadius="6px">
            CHOICE TWO 

            <TextField
                onChange={e => setNametwo(e.target.value)}
                value={nametwo}
                color="secondary" size="small" id="dch"  label="Sub Name" variant="outlined" fullWidth margin="normal" />

            <TextField
                onChange={e => setPricetwo(e.target.value)}
                value={pricetwo}
                color="secondary" size="small" id="dch"  label="Price" variant="outlined" fullWidth margin="normal" />
                
        </Box>

        <Box p="25px" mt="50px" boxShadow="2" borderRadius="6px">
            CHOICE THREE - 

            <TextField
                onChange={e => setNamethree(e.target.value)}
                value={namethree}
                color="secondary" size="small" id="dch"  label="Sub Name" variant="outlined" fullWidth margin="normal" />

            <TextField
                onChange={e => setPricethree(e.target.value)}
                value={pricethree}
                color="secondary" size="small" id="dch"  label="Price" variant="outlined" fullWidth margin="normal" />
                
        </Box>
            

        <br/>
        <Button onClick={() => submitPro()} variant="contained" color="primary" fullWidth>
            Add
        </Button>
    </div>
    }
    </div>

       
    )
}

export default AddProductFrag
