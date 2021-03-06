import { Box, Button, CircularProgress, Container, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { db } from '../config';

const SettingFrag = () => {

    const [dcharge, setDcharge] = useState()
    const [mcharge, setMcharge] = useState()
    const [version, setVersion] = useState()
    const [alert, setAlert] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        db.collection('Restro')
        .doc('setting')
        .onSnapshot(documentSnapshot => {
            console.log('User data: ', documentSnapshot.data());
            setDcharge(documentSnapshot.data().dcharge);
            setMcharge(documentSnapshot.data().mcharge)
            setVersion(documentSnapshot.data().appversion)
            setAlert(documentSnapshot.data().alert)
            setTimeout(() => {
                setLoading(false)
            }, 1000);
          });
    },[])


    const update = () =>{
        console.log(mcharge)
        if(mcharge === undefined || dcharge === undefined || version == undefined){
            swal({
                title: "Sorry!",
                text: "Empty Field",
                icon: "error",
                button: "Ok!",
              });
        }else{

            db.collection('Restro')
            .doc('setting')
            .update({
                dcharge: parseInt(dcharge, 10),
                mcharge:  parseInt(mcharge, 10),
                appversion:version,
                alert:alert
            })
            .then(() => {
                swal({
                    title: "Good job!",
                    text: "Setting Updated",
                    icon: "success",
                    button: "Ok!",
                  });
            });
            
        }
    }

    return (
        <div>
          {loading?  
                <Container maxWidth="sm" style={{padding:100}}>
                    <CircularProgress color="inherit"/>
                </Container>
            :
             <Box textAlign="center" p="25px" mt="0px" boxShadow="2" borderRadius="6px">
         <TextField
          onChange={e => setDcharge(e.target.value)}
          value={dcharge}
          color="secondary" size="small" id="dch"  label="Delivery Charge" variant="outlined" fullWidth margin="normal" />
         
          <br/>

          <TextField
          onChange={e => setMcharge(e.target.value)}
          value={mcharge}
          color="secondary" size="small" id="mch" label="Minimum Amount" variant="outlined" fullWidth margin="normal" />
         
          <br/>

          <TextField
          onChange={e => setAlert(e.target.value)}
          value={alert}
          color="secondary" size="small" id="dch"  label="Order Update" variant="outlined" fullWidth margin="normal" />
         
          <br/>

          <TextField
          onChange={e => setVersion(e.target.value)}
          value={version}
          color="secondary" size="small" id="dch"  label="App Version" variant="outlined" fullWidth margin="normal" />
         
          <br/>


          <Button onClick={()=>update()} variant="contained" color="primary" fullWidth>
              Update
          </Button>
        </Box>
        }
        </div>
    )
}

export default SettingFrag
