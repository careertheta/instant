import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {HomeRounded, Category, Fastfood, Settings, PowerSettingsNew, ClassRounded} from '@material-ui/icons';
import CatFrag from '../Fragments/CatFrag'
import HomeFrag from '../Fragments/HomeFrag'
import OrderFrag from '../Fragments/OrderFrag'
import SettingFrag from '../Fragments/SettingFrag'
import AddProductFrag from '../Fragments/AddProductFrag'
import {useSelector, useDispatch} from 'react-redux'
import { auth, db } from '../config'
import swal from 'sweetalert';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
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

              <Link to={`/product`} className={classes.nodec}>
              <ListItem button>
                <ListItemIcon>
                    <Fastfood/>
                </ListItemIcon>
                    <ListItemText primary="Add Product" />
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
        {/* <CatFrag/> */}
        {/* <OrderFrag/> */}
        {/* <AddProductFrag/> */}
      </main>
    </div>
  );
}

export default Home
