import { Button, ButtonGroup, CircularProgress, Container, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
    const [lastid, setLastid] = useState()
    const [custnumber, setCusnumber] = useState()
    const [cusaddress, setCusaddress] = useState()

    const alldata = useSelector(state=>{
        return state
    })

    const [shopstate, setShopstate] = useState({
        checkedA: false
    });

    let nstatus = ""
    let colorn = ""

    useEffect(()=>{
        if(alldata.restro.status != undefined){
            setShopstate({checkedA:alldata.restro.status})
            console.log(alldata.restro.status)
        }else{
            console.log("Undefined")
        }
        // setShopstate({checkedA:alldata.restro.status})
        const subscriber = db.collection('Orders')
        .orderBy('somoy', 'desc')
        .limit(102)
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
                // console.log(orderTop)
            }else{
              console.log("No Orders")
            }
        });
   
        return () => subscriber();
    }, [alldata.restro.status])

    const acceptOrder = (id) =>{
        console.log(id)
        db.collection('Orders')
        .doc(id)
        .update({
            status: 1,
        })
        .then(() => {

            fetch('https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messsage:{
                        token:'cVv-vn8NSNaiWEHBeuu8SH:APA91bH-ceXLojm_SvGzeuYQiYg2bJmODn88Bt-4eS7FreX4NJHp0lEEFpmh7gl7fkSK-0dJAr9D_YAp8MmDGuee80zmSfZpPZudfXYk1XmEzW-3gJuUuMtygQATsquliEM_8c503zCQ',
                        data:{},
                        notification:{
                            body:'notify',
                            title:'great'
                        }
                    }
                 
                })
              });


            swal({
                title: "Good job!",
                text: "Order Accepted",
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
                text: "On The Way",
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
                text: "Delivered",
                icon: "success",
                button: "Ok!",
              });
        });
    }

    const cancelOrder = (id) =>{

        swal({
            title: "Are you sure?",
            text: "Do you want to cancel the order!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                db.collection('Orders')
                .doc(id)
                .update({
                    status: 4,
                })
                .then(() => {
                    swal("Order Cancelled!", {
                        icon: "success",
                    });
                });
            } else {
              swal("Order is safe!");
            }
          });
    }

    const viewOrder = (id, tamount, num, address) =>{
       setOview(true)
       setCusaddress(address)
       setCusnumber(num)
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

    const handleSwitchChange = (event) => {
        setShopstate({ ...shopstate, [event.target.name]: event.target.checked });
        console.log(event.target.checked)
        db.collection('Restro')
        .doc("setting")
        .update({
            status: event.target.checked,
        })
        .then(() => {
            swal({
                title: "Good job!",
                text: "Status Updated",
                icon: "success",
                button: "Ok!",
              });
        });
    };

    return (
        <div>
            {loading? "Loading.." : 
            <div>
                {shopstate.checkedA? "Shop Open" : "Shop Closed"}
                <Switch
                    checked={shopstate.checkedA}
                    onChange={handleSwitchChange}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </div> }
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
                                                
                        <TableRow key={index} style={{backgroundColor:colorn}}>
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
                           Address - {cusaddress}
                        </TableCell>
                        <TableCell align="left">
                           Number - {custnumber}
                        </TableCell>
                        <TableCell align="left">
                            
                        </TableCell>    
                        </TableRow>

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
                        colorn = "#ff7675"
                    }else if(row.status == "1"){
                        nstatus = "Processing..."
                        colorn = "white"
                    }else if(row.status == "2"){
                        nstatus = "On The Way..."
                        colorn = "#03a9f4"
                    }else if(row.status == "3"){
                        nstatus = "Delivered"
                        colorn = "#8bc34a"
                    }else if(row.status == "4"){
                        nstatus = "cancelled"
                        colorn = "#ff3d00"
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
                                <Button  onClick={()=> viewOrder(index, row.amount, row.number, row.address)}>View</Button>
                                <Button  onClick={()=> acceptOrder(row.key)}>Accept</Button>
                                <Button  onClick={()=> onTheWayOrder(row.key)}>On The Way</Button>
                                <Button  onClick={()=> deliveredOrder(row.key)}>Delivered</Button>
                                <Button  onClick={()=> cancelOrder(row.key)}>Cancel</Button>
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
