import { useState } from 'react'
import './App.css'
import './components/Navbar'

import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App
