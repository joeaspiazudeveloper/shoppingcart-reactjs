import './App.scss';
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NavBar from './components/NavBar';
import NotFound from './components/NotFound';

import AddProduct from './page/AddProduct';
import Home from './page/Home';
import Cart from './page/Cart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path='/not-found' Component={NotFound} />
          <Route path='/cart' Component={Cart} />
          <Route path='/addProduct' Component={AddProduct} />
          <Route path='/' Component={Home} />
          <Route path="*" element={<Navigate to ="/not-found" />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
