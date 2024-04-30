
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './componets/Navbar/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart/container/cartContainer';
function App () {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
