import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProductListContainer from './components/ProductListContainer';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ProductListContainer />} />
      <Route path='/products/:productId' element={<ProductDetails />} />
    </Routes>
  );
}

export default App;
