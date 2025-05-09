import './App.css';
import Navbar from './componenet/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';

import Login from './pages/Login';
import Singup from './pages/Singup';
import Order from './pages/Order';
import AddProduct from './pages/AddProduct';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from './componenet/Footer';

function App() {
  return (
    <>
    <ToastContainer position="top-center" autoClose={3000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/order" element={<Order/> } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup/>} />
        <Route path="/add-Product" element={<AddProduct/>}/>
        
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
