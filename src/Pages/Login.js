import React, {useState} from 'react'
import {Container, Box, TextField, CircularProgress, Button} from '@material-ui/core'
import logo from '../media/logo.png'
import {auth, db} from "../config"
import { useHistory } from "react-router-dom";


const Login = () => {

    const [email, setEmail] =  useState("")
    const [password, setPassword] =  useState("")
    const [loading, setLoading] = useState(false)
    const [emailerror, setEmailerror] = useState(null)
    const [passerror, setPasserror] = useState(null)
    const history = useHistory();

    const hemail = (evt) => {
        evt.preventDefault();
        setEmail(evt.target.value)
    }

    const hpassword = (evt) => {
        evt.preventDefault();
        setPassword(evt.target.value)
    }

    const login = () =>{
        setLoading(true)
        let valid = true;
        setEmailerror(null)
        setPasserror(null)

        if(email === ""){
            setEmailerror("Required")
            valid = false
        }

        if(password === ""){
            setPasserror("Required")
            valid = false
        }

        if(valid){
            console.log("Login Now")
            db.collection("Admin")
            .where('email', '==', email)
            .where('password', '==', password)
            .get()
            .then(querySnapshot=>{
                if(!querySnapshot.empty){

                    // auth.createUserWithEmailAndPassword(email, password)
                    // .then((user) => {
                    //     console.log("Success")
                    // })
                    // .catch((error) => {
                    //   var errorCode = error.code;
                    //   var errorMessage = error.message;
                    //   // ..
                    // });
                    
                    auth.signInWithEmailAndPassword(email, password)
                    .then(res=>{
                        console.log(res)
                        history.push({
                            pathname:  "/",
                         })
                    }).catch(err=>{
                       console.log(err)
                    })
                }else{
                    setEmailerror("Email Not Valid")
                    setLoading(false)
                }
            })
        }
    }
    
        return (
            <Container maxWidth="xs">
                <Box textAlign="center" p="25px" mt="50px" boxShadow="2" borderRadius="6px">
                    <img src={logo} height="150px"/>
                    <TextField
                    error={emailerror!=null}
                    helperText={emailerror}
                    value={email}
                    onChange={e => hemail(e)}
                    color="secondary" size="small" id="outlined-basic" label="Email Address" variant="outlined" fullWidth margin="normal" />

                    <TextField color="secondary" 
                    error={passerror!=null}
                    helperText={passerror}
                    value={password}
                    onChange={e => hpassword(e)}
                    size="small" id="outlined-basic" type="password" label="Password"  variant="outlined" fullWidth margin="normal" />

                   {loading? 
                    <CircularProgress color="primary" size={24}/>
                    : null 
                    }
                    <br/>
                    <br/>
                    <Button onClick={()=>login()} variant="contained" color="primary" fullWidth>
                        Login Now
                    </Button>
                </Box>
            </Container>
        )
}

export default Login
