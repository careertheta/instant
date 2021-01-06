import { Button, ButtonGroup, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { db } from '../config';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const OrderFrag = () => {

    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [loadingtwo, setLoadingtwo] = useState(true)
    const [order, setOrder] = useState()
    const [oview, setOview] = useState(false)
    const [odesc, setOdesc] = useState([])
    const [ntotal, setNtotal] = useState()
    let nstatus = ""
    let colorn = ""

    useEffect(()=>{
        const subscriber = db.collection('Orders')
        .orderBy('somoy', 'desc')
        .onSnapshot(querySnapshot => {
            const orderTop = [];
            querySnapshot.forEach(documentSnapshot => {
                orderTop.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
              });

              if(orderTop.length != 0){
                setOrder(orderTop)
                setLoading(false)
                console.log(orderTop)
            }else{
              console.log("No Orders")
            }
        });
   
        return () => subscriber();
    }, [])

    const acceptOrder = (id) =>{
        console.log(id)
        db.collection('Orders')
        .doc(id)
        .update({
            status: 1,
        })
        .then(() => {
            swal({
                title: "Good job!",
                text: "Status Updated",
                icon: "success",
                button: "Ok!",
              });
        });
    }

    const onTheWayOrder = (id) =>{
        console.log(id)
        db.collection('Orders')
        .doc(id)
        .update({
            status: 2,
        })
        .then(() => {
            swal({
                title: "Good job!",
                text: "Status Updated",
                icon: "success",
                button: "Ok!",
              });
        });
    }

    const deliveredOrder = (id) =>{
        db.collection('Orders')
        .doc(id)
        .update({
            status: 3,
        })
        .then(() => {
            swal({
                title: "Good job!",
                text: "Status Updated",
                icon: "success",
                button: "Ok!",
              });
        });
    }

    const viewOrder = (id, tamount) =>{
       setOview(true)
       setNtotal(tamount)
       setOdesc(order[id].order)
        setTimeout(() => {
            setLoadingtwo(false)
        }, 1000);
    }

    const closeDesc = () =>{
        setLoadingtwo(true)
        setOview(false)
    }

    return (
        <div>
            {oview? 
                <div>
                <TableContainer component={Paper}>
                {loadingtwo?  
                <Container maxWidth="sm" style={{padding:100}}>
                    <CircularProgress color="inherit"/>
                </Container>
               : 
                    <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Qty</TableCell>
                        <TableCell align="left">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {odesc.map((row, index) => {

                    return (
                                                
                        <TableRow key={row.index} style={{backgroundColor:colorn}}>
                        <TableCell align="left">
                            {row.name} {row.proname}
                        </TableCell>    
                        <TableCell align="left">
                            {row.qty}
                        </TableCell>
                        <TableCell align="left">
                            {row.price}
                        </TableCell>
                        </TableRow>
                    )

                    })}

                        <TableRow>
                        <TableCell align="left">
                             <Button variant="contained" color="primary" onClick={()=> closeDesc()}>Close</Button>
                        </TableCell>
                        <TableCell align="left">
                            
                        </TableCell>
                        <TableCell align="left">
                            {ntotal}
                        </TableCell>    
                        </TableRow>
                    </TableBody>
                </Table> }
            </TableContainer>
            </div>
             :
            <TableContainer component={Paper}>
            {loading?  
                
                <Container maxWidth="sm" style={{padding:100}}>
                    <CircularProgress color="inherit"/>
                </Container> :

                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>Order No.</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Total</TableCell>
                    <TableCell align="left">View</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {order.map((row, index) => {
                    if(row.status == "0"){
                        nstatus = "Pending.."
                        colorn = "#ff3d00"
                    }else if(row.status == "1"){
                        nstatus = "Processing..."
                        colorn = "white"
                    }else if(row.status == "2"){
                        nstatus = "On The Way..."
                        colorn = "#03a9f4"
                    }else if(row.status == "3"){
                        nstatus = "Delivered"
                        colorn = "#8bc34a"
                    }            
                    
                    return (
                            
                        <TableRow key={row.key} style={{backgroundColor:colorn}}>
                        <TableCell component="th" scope="row">
                            {row.key} 
                        </TableCell>
                        <TableCell align="left">
                            {row.name} - {nstatus}
                        </TableCell>    
                        <TableCell align="left">
                            {row.amount}
                        </TableCell>
                        <TableCell align="left">
                            <ButtonGroup variant="text" color="secondary" aria-label="text primary button group">
                                <Button  onClick={()=> viewOrder(index, row.amount)}>View</Button>
                                <Button  onClick={()=> acceptOrder(row.key)}>Accept</Button>
                                <Button  onClick={()=> onTheWayOrder(row.key)}>On The Way</Button>
                                <Button  onClick={()=> deliveredOrder(row.key)}>Delivered</Button>
                            </ButtonGroup>
                        </TableCell>
                        </TableRow>
                    
                )
                    
                })}
                </TableBody>
                </Table> }
            </TableContainer>
            }
        </div>
    )
}

export default OrderFrag
