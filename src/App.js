import React,{useEffect,Suspense,FC,lazy} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom";
import {useSelector} from "react-redux"
import {RootState} from "./rootReducer"

import Auth from "./features/auth/Auth"
import Home from "./features/home/Home"
const App=()=>{
  const isLoggedIn=useSelector((state)=>state.auth.isAuthenticated)
 
  return(
 <Router>
<Switch>
  <Route path="/">
  <Suspense fallback={<p>Loading...</p>}>
            {isLoggedIn ? <Home /> : <Auth />}
          </Suspense>    
  </Route>
</Switch>
 </Router>
  )
}

export default App;
