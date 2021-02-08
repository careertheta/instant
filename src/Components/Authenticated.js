import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import { auth, db } from '../config'
import {useSelector, useDispatch} from 'react-redux'


const Authenticated = (props) => {

    const [loggedIn, setLoggedIn] = useState(null)
    const dispatch = useDispatch();

    useEffect(()=>{
        db.collection('category')
        .orderBy('id', 'asc')
        .get()
        .then(querySnapshot => {
          const catTop = [];
          querySnapshot.forEach(documentSnapshot => {
              catTop.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
                });
                
          });
          
          dispatch({type:"addcategory", payload:catTop})
          if(catTop.length != 0){
                db.collection('Restro').get()
                .then(querySnapshot => {
                const restroTop = [];
                querySnapshot.forEach(documentSnapshot => {
                    restroTop.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                dispatch({type:"addrestro", payload:restroTop[2]})
            }); 
          }else{
            console.log("We are not ready")
          }
          
        });

    },[])

        auth.onAuthStateChanged(usernow =>{
            if(usernow){    
                setLoggedIn(true)
            }else{
                setLoggedIn(false)
            }
        });
    
        if(props.nonAuthenticated){
            if(loggedIn == null){
                return "Loading..."
            }else if(!loggedIn){
                return props.children;
            } else if(loggedIn){
                return <Redirect to="/"/>;
            }
        }else{
            if(loggedIn == null){
                return "Loading..."
            }else if(loggedIn){
                return props.children;
            } else if(!loggedIn){
                return <Redirect to="/login"/>;
            }
        }
};

export default Authenticated
