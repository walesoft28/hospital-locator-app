import React from 'react';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import History from '../history/History';
import Search from '../search/Search';

function Home() {
  return (
    <Router>
       <div className="App">  
        <Container maxWidth="md">
            <Route exact path='/' component={Search} /> 
            <Route exact path='/history' component={History} />       
        </Container> 
        
        
      </div>
    </Router> 
  );
}

export default Home;
