import React from "react";
import { useDispatch } from 'react-redux';
import { decreaseProductAmount } from '../features/productsSlice';
import { addToCart } from '../features/cartSlice';

function ProductList({ product }) {
    const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(decreaseProductAmount(product));
    dispatch(addToCart(product));
  };

  return (
    <div key={product.id} className="product">
      <h3>
        {product.name} <span className="quantity">({product.amount})</span>
      </h3>
      <img src={product.image} alt={product.name} />
      <div className="details">
        <span>{product.desc}</span>
        <span className="price">${product.price}</span>
      </div>
      <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
    </div>
  );
}

export default ProductList;
