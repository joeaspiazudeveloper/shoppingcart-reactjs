import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getTotals } from '../features/cartSlice';
import { Link } from 'react-router-dom';

import ProductList from '../components/ProductList';

const Home =() => {
  const { items: products, status } = useSelector((state) => state.products);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch])

  return (
    <div className='home-container'>
      { status.status === 'loading' ? (
        <p>Loading...</p>
       ) : status.status === 'error' ? (
       <p>An error occured...</p> 
      ) : (
        <>
          <div className="title-add">
            <h2>Product List</h2>
            <Link to="/addProduct">
              <button>Add Product</button>
            </Link>
          </div>
          {products.length > 0 && <ProductList products={products}></ProductList>}
        </>
      )}
    </div>
  )
}

export default Home;