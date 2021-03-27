import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from "react-router-dom";

const Product = (props) => {
  // console.log(props);
  const { name, img,seller ,price,stock,key} = props.product;
  return (
    <div className="product">
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <h4 className = 'product-name'><Link to ={"/product/"+key}>{name}</Link></h4><br/>
        <p>by: {seller}</p><br/>
        <p>${price}</p><br/>
        <p>only {stock} left in stock - order soon</p><br/>
        { props.showAddToCart && <button onClick = {()=> props.handleAddClick(props.product)} className = 'main-button'> <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}
      </div>
    </div>
  );
};

export default Product;
