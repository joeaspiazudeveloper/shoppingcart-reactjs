import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { addToCart, getTotals } from '../features/cartSlice';
import { Link } from 'react-router-dom';
import { decreaseProductAmount } from '../features/productsSlice';

const Home =() => {
  const { items: products, status } = useSelector((state) => state.products);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch])

  const handleAddToCart = (product) => {
    dispatch(decreaseProductAmount(product));
    dispatch(addToCart(product));
  }

  return (
    <div className='home-container'>
      { status.status === 'loading' ? (
        <p>Loading...</p>
       ) : status.status === 'error' ? (
       <p>An error occured...</p> 
      ) : (
        <>
          <div className="title-add">
            <h2>New Products</h2>
            <Link to="/addProduct">
              <button>Add Product</button>
            </Link>
          </div>
          <div className="products">
            { products?.map((product) => (
              <div key={product.id} className='product'>
                <h3>{product.name} <span className='quantity'>({product.amount})</span></h3>
                <img src={product.image} alt={product.name} />
                <div className="details">
                  <span>{product.desc}</span>
                  <span className='price'>${product.price}</span>
                </div>
                <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Home;