import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Category, Fastfood, HomeRounded, PowerSettingsNew, Settings } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Link, Route,
  useRouteMatch
} from "react-router-dom";
import swal from 'sweetalert';
import { auth } from '../config';
import AddCategory from '../Fragments/AddCategory';
import AddProductFrag from '../Fragments/AddProductFrag';
import CatFrag from '../Fragments/CatFrag';
import EditProductFrag from '../Fragments/EditProductFrag';
import OrderFrag from '../Fragments/OrderFrag';
import SettingFrag from '../Fragments/SettingFrag';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  nodec:{
    textDecoration:"none",
    color:"#000"
  }
}));

const  Home = () => {


  let match = useRouteMatch();

  const alldata = useSelector(state=>{
    return state
  })

  useEffect(()=>{
      console.log("category" + alldata.categories.length)
  })

  const logOut = () =>{

    swal({
      title: "Are you sure?",
      text: "You want to Log Out!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Thank you for using Devil Touch Solution", {
          icon: "success",
        });

        auth.signOut()
        .then(() => console.log('User signed out!'));
        
      } else {
        swal("Welcome again to Crystal Admin!");
      }
    });
  }
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
             Crystal Admin 
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>

          <Link to={`/home`} className={classes.nodec}>
              <ListItem button>
                <ListItemIcon>
                    <HomeRounded/>
                </ListItemIcon>
                    <ListItemText primary="Home" />
              </ListItem>
              </Link>

              <Link to={`/category`} className={classes.nodec}>
              <ListItem button>
                <ListItemIcon>
                    <Category/>
                </ListItemIcon>
                    <ListItemText primary="Category" />
              </ListItem>
              </Link>

              <Link to={`/addcategory`} className={classes.nodec}>
              <ListItem button>
                <ListItemIcon>
                    <Fastfood/>
                </ListItemIcon>
                    <ListItemText primary="+ Category" />
               </ListItem>
               </Link>     

              <Link to={`/product`} className={classes.nodec}>
              <ListItem button>
                <ListItemIcon>
                    <Fastfood/>
                </ListItemIcon>
                    <ListItemText primary="+ Product" />
               </ListItem>
               </Link>       

               <Link to={`/editproduct`} className={classes.nodec}>
              <ListItem button>
                <ListItemIcon>
                    <Fastfood/>
                </ListItemIcon>
                    <ListItemText primary="Edit Product" />
               </ListItem>
               </Link>              

               <Link to={`/setting`} className={classes.nodec}>
              <ListItem button>
                <ListItemIcon>
                   <Settings/>
                </ListItemIcon>
                    <ListItemText primary="Settings" />
              </ListItem>
              </Link>

              </List>

              <Divider />
              <List>
              <ListItem button onClick={()=> logOut()}>
                <ListItemIcon>
                    <PowerSettingsNew/>
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItem>
          </List>
          <Divider />
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Route path="/home" render={({match}) => (
            <OrderFrag/>
          )}/>
        <Route path="/setting" render={({match}) => (
            <SettingFrag/>
        )}/>

        <Route path="/product" render={({match}) => (
            <AddProductFrag/> 
        )}/>

        <Route path="/category" render={({match}) => (
            <CatFrag/> 
        )}/>

        <Route path="/addcategory" render={({match}) => (
            <AddCategory/> 
        )}/>

        <Route path="/editproduct" render={({match}) => (
            <EditProductFrag/> 
        )}/>
      </main>
    </div>
  );
}

export default Home
