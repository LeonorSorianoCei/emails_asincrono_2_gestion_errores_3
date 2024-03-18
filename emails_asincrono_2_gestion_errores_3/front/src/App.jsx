import React, { useState } from 'react';
import './App.css';
import Tabs from './components/tabs/Tabs';

function App() {
  
  
  const {VITE_API} = import.meta.env;
  return (
    <>
    <div className='app'>
    <Tabs/>
    </div>
    <div>la url que se esta usando es {VITE_API} </div>
    </>
  );
}

export default App;
