import { useDispatch, useSelector } from 'react-redux';

import { useState } from "react";
import { createProduct } from '../features/productsSlice';

import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [fields, setFields] = useState({
    name: '',
    price: 0,
    amount: 0,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleValidation = () => {
    const formFields = {...fields};
    const formErrors = {};
    let formIsValid = true;

    //Name
    if(!formFields["name"]){
      formIsValid = false;
      formErrors["name"] = "Please fill the name / enter valid name";
    }

    if(typeof formFields["name"] !== "undefined"){
      if(formFields["name"].match(/^[\\p{L} .'-]+$/)){
        formIsValid = false;
        formErrors["name"] = "Please fill the name / enter valid name";
      }       
    }

    //Price
    if(!formFields["price"]){
      formIsValid = false;
      formErrors["price"] = "Please fill the price / enter valid price";
    }

    if(typeof formFields["price"] !== "undefined"){
      if(formFields["price"].toString().match(new RegExp(`/^-?d+.?d*$/`, 'gi'))) {
        formIsValid = false;
        formErrors["price"] = "Please fill the price / enter valid price";
      }     
    }

    //amount
    if(!formFields["amount"]){
      formIsValid = false;
      formErrors["amount"] = "Please fill the amount / enter valid amount";
    }

    if(typeof formFields["amount"] !== "undefined"){
      if(formFields["amount"].toString().match(new RegExp(`/^-?d+.?d*$/`, 'gi'))) {
        formIsValid = false;
        formErrors["amount"] = "Please fill the amount / enter valid amount";
      }       
    }
    console.log([formFields, formErrors]);
    setErrors(formErrors)
    return formIsValid;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(handleValidation()){
      let newProduct = {
        name: fields.name,
        price: fields.price + 0,
        amount: fields.amount + 0,
        id: products.items.length + 1,
        image: 'https://imgs.search.brave.com/evSRbcQAYXNmPczN41SHIQXnKknh6XsyxDF_7l2aXds/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5oc3dzdGF0aWMu/Y29tL2V5SmlkV05y/WlhRaU9pSmpiMjUw/Wlc1MExtaHpkM04w/WVhScFl5NWpiMjBp/TENKclpYa2lPaUpu/YVdaY0x6SmlkWGt0/WjJWdVpYSnBZeTB4/TG1wd1p5SXNJbVZr/YVhSeklqcDdJbkps/YzJsNlpTSTZleUoz/YVdSMGFDSTZPREk0/ZlgxOQ',
        desc: `Description for ${fields.name}`
      }
      dispatch(createProduct(newProduct));
      navigate('/');
    }else{
      return;
    }

    
    
    
    
  };
  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form-control">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={fields.name}
            placeholder="Enter your name"
            onChange={handleInputChange}
          />
        </div>
        <div className='error-container'><span className="error">{errors["name"]}</span></div>

        <div className="form-control">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={fields.price}
            placeholder="Enter the price"
            onChange={handleInputChange}
          />
        </div>
        <div className='error-container'><span className="error">{errors["price"]}</span></div>

        <div className="form-control">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={fields.amount}
            placeholder="Enter the amount"
            onChange={handleInputChange}
          />
        </div>
        <div className='error-container'><span className="error">{errors["amount"]}</span></div>

        <div className="form-control btn-container">
          <button type="submit">Create</button>
        </div>
        
      </form>
    </div>
  );
}

export default AddProduct;
