import React from "react";
import { useDispatch } from "react-redux";
import { decreaseProductAmount } from "../features/productsSlice";
import { addToCart } from "../features/cartSlice";
import { useState } from "react";

function ProductList({ products }) {
  const [productStates, setProductStates] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = { disabled: product.amount === 0 };
      return acc;
    }, {})
  );
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(decreaseProductAmount(product));
    dispatch(addToCart(product));
    const updatedProductStates = { ...productStates };
    updatedProductStates[product.id] = {
      disabled: products.find((p) => p.id === product.id).amount === 1,
    };
    setProductStates(updatedProductStates);
  };

  return (
    <div className="products">
      {products.length > 0 &&
        products?.map((product) => (
          <div key={product.id} className="product">
            <h3>
              {product.name}{" "}
              <span className="quantity">({product.amount})</span>
            </h3>
            <img src={product.image} alt={product.name} />
            <div className="details">
              <span>{product.desc}</span>
              <span className="price">${product.price}</span>
            </div>
            <button
              disabled={productStates[product.id].disabled}
              onClick={() => handleAddToCart(product)}
            >
              Add To Cart
            </button>
          </div>
        ))}
    </div>
  );
}

export default ProductList;
