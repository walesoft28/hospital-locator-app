import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import History from './components/history/History';
import Search from './components/search/Search';

function App() {
  return (
    <BrowserRouter>
       <div className="App">
        <NavBar children />
        <Container maxWidth="md">
          <Route exact path='/' component={Search} />
          <Route path='/history' component={History} />
        </Container>
        
      </div>
    </BrowserRouter> 
  );
}

export default App;
