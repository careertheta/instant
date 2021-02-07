import React from 'react'
import './App.css';
import Button from '@material-ui/core/Button'
import {db} from './config'
import {Redirect, Route, Switch } from 'react-router-dom'
import Login from './Pages/Login';
import Home from './Pages/Home'
import Authenticated from './Components/Authenticated';


function App() {

  

  // var docRef = db.collection("products").doc("1zQ3N9oLYMLa8gMIBGUB")

      // db.collection("category")
      // .get()
      // .then(function(querySnapshot) {
      //     querySnapshot.forEach(function(doc) {
      //         // doc.data() is never undefined for query doc snapshots
      //         console.log(doc.id, " => ", doc.data());
      //     });
      // })
      // .catch(function(error) {
      //     console.log("Error getting documents: ", error);
      // });



  return (
      <Switch>
          <Route exact path="/">
            <Authenticated>
              <Home/>
            </Authenticated>
          </Route>

          <Route exact path="/setting">
            <Authenticated>
              <Home/>
            </Authenticated>
          </Route>

          <Route exact path="/home">
            <Authenticated>
              <Home/>
            </Authenticated>
          </Route>

          <Route exact path="/product">
            <Authenticated>
              <Home/>
            </Authenticated>
          </Route>

          <Route exact path="/category">
            <Authenticated>
              <Home/>
            </Authenticated>
          </Route>

          <Route exact path="/addcategory">
            <Authenticated>
              <Home/>
            </Authenticated>
          </Route>

          <Route exact path="/editproduct">
            <Authenticated>
              <Home/>
            </Authenticated>
          </Route>


        {/* <Route exact path="/home" component={Home}></Route> */}
         <Route exact path="/login">
           <Authenticated nonAuthenticated={true}>
            <Login/>
           </Authenticated>
         </Route>
         <Route path="*" render={()=>"404 NOt Found"}></Route>
         {/* <Route exact path="/">
            <Redirect to="/login"/>
         </Route> */}
      </Switch>
  );
}

export default App;
