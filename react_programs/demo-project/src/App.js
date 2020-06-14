import React from 'react';
import logo from './logo.svg';
import './App.css';

import Dashboard from './dashboard';
import Store from './Store'; 
import Login from './Login'
function App() {
  return (
    <div className="App">
      <Store>
      <Dashboard />
      </Store>
      
        
    </div>
  );
}

export default App;
