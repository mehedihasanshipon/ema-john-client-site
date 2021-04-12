import React, { useEffect, useState } from "react";
// import fakeData from '../../fakeData';
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link } from "react-router-dom";

const Shop = () => {
  // const first10 = fakeData.slice(0,10);
  const [products, setProduct] = useState([]);
  const [carts, setCart] = useState([]);
  const [search, setSearch] = useState("");

  console.log(search);

  // const handleSearch = (event)=>{
  //     setSearch(event.target.value)
  // }

  useEffect(() => {
    fetch("http://localhost:3002/products?search=" + search, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);
    // console.log(products,quantity);
    fetch("http://localhost:3002/productsByKeys", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);
  // console.log(carts)
  const handleAddClick = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = carts.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = carts.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...carts, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };
  return (
    <div className="twin-container">
      <div className="product-container">
        <input type="text" placeholder="Search.." onChange={handleSearch} />
        {products.map((product) => (
          <Product
            showAddToCart={true}
            product={product}
            key={product.key}
            handleAddClick={handleAddClick}
          />
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={carts}>
          <Link to="/review">
            <button className="main-button">Review Now</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
