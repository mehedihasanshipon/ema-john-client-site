import React, { useEffect, useState } from 'react';
// import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import thankYouImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart,setCart] = useState([]);
    const [ordered,setOrder] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment');
    }
    const removeProduct = (productKey) => {
        console.log('clicked',productKey);
        const newCart = cart.filter(pd => pd.key !== productKey );
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    console.log(cart)
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('http://localhost:3002/productsByKeys',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body:JSON.stringify(productKeys)
        })
        .then(res=>res.json())
        .then(data=>setCart(data))

        // const cartProducts = productKeys.map(key => {
        //     const product = fakeData.find(pd => pd.key === key);
        //     // console.log(product)
        //     product.quantity = savedCart[key];
        //     return product;
        // });
        // setCart(cartProducts);
    },[])
    
    let thankyou;
    if(ordered){
        thankyou = <img src={thankYouImage} alt=""/>;
    }    
    return (
        <div className ="twin-container">
            <div className="product-container">
                <h1>Cart items : {cart.length}</h1>
                {
                    cart.map(pd => <ReviewItem removeProduct = {removeProduct} product = {pd} key = {pd.key} />)
                }
                {thankyou}
            </div>
            <div className = 'cart-container'>
                <Cart cart = {cart}>
                    <button onClick ={handleProceedCheckout} className = "main-button">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;