import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import routes from './config/routes';
import './App.scss'

function App() {

  return (
  <Router>
    <Switch>
      {routes.map((route,index)=>(
        <RouterWithSubRoutes key={index} {...route}/>
      ))}
    </Switch>
  </Router>  
  )
}

function RouterWithSubRoutes(route){
    
  return (
    <Route 
    exact={route.exact} 
    path={route.path}
    render={props => <route.component routes={route.routes}{...props}/>}
    />
  );
}

export default App;
