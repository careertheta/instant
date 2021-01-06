import React, {useState, useEffect} from 'react';
import { Button, Box, TextField, Container, CircularProgress} from '@material-ui/core';
import swal from 'sweetalert';
import { makeStyles } from '@material-ui/core/styles';
import { auth, db } from '../config'

const SettingFrag = () => {

    const [dcharge, setDcharge] = useState()
    const [mcharge, setMcharge] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        db.collection('Restro')
        .doc('setting')
        .onSnapshot(documentSnapshot => {
            console.log('User data: ', documentSnapshot.data());
            setDcharge(documentSnapshot.data().dcharge);
            setMcharge(documentSnapshot.data().mcharge)
            setTimeout(() => {
                setLoading(false)
            }, 1000);
          });
    },[])


    const update = () =>{
        console.log(mcharge)
        if(mcharge === undefined || dcharge === undefined){
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
                mcharge:  parseInt(mcharge, 10)
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
          <Button onClick={()=>update()} variant="contained" color="primary" fullWidth>
              Update
          </Button>
        </Box>
        }
        </div>
    )
}

export default SettingFrag
