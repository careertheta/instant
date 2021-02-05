import { Avatar, Box, Button, TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';
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

const AddCategory = () => {

    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const [pic, setPic] = useState()
    const [name, setName] = useState("")

    const submitCategory = () =>{

        db.collection('category')
        .orderBy('id', 'desc')
        .limit(1)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {                    
                    db.collection('category')
                    .add({
                      id: documentSnapshot.data().id + 1,
                      name:name,
                      pic:pic,
                      status:false,
                    })
                    .then(() => {
                      swal("Catgeory Added", {
                        icon: "success",
                      });
                       // AFTER SUCCESS MOVE TO ALL PRODUCTS
                       let path = `category`; 
                       history.push(path);
                    });   
            });
        });
    }

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
             <div className={classes.root}>
                <TextField
                onChange={e => setName(e.target.value)}
                value={name}
                color="secondary" size="small" id="dch"  label="Category Name" variant="outlined" fullWidth margin="normal" />
                
                <br/>

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

                <Button onClick={() => submitCategory()} variant="contained" color="primary" fullWidth>
                    Add Category
                </Button>
        </div>
            
        </div>
    )
}

export default AddCategory
