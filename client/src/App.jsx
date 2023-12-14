import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom';

import image from "../public/360_F_215948377_kgIhNUy4X0iYsyUfYd9KKIViSPOxclbC.jpg";

function App() {
  return (
    <div style={{ backgroundImage:`url(${image})` }}>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App
