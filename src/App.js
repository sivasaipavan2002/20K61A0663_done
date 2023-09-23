import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SingleTrain from './Componets/Frontend/SingleTrain';
import Trains from './Componets/Trains';


function App() {
  return (
    
    <Router>
      <Switch>
        <Route path="/" exact component={Trains} />
        <Route path="/train/:trainNumber" component={SingleTrain} />
      
      </Switch>
    </Router>
  );
}

export default App;
