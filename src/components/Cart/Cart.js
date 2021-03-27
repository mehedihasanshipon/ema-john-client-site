import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    const totalPrice = cart.reduce((total,prd) => total + prd.price * prd.quantity || 1,0);

    let shipping = 0;
    if(totalPrice > 35){
        shipping = 0;
    }else if(totalPrice > 15){
        shipping = 4.99;
    }else if(totalPrice > 0){
        shipping = 12.99;
    }

    const tax = (totalPrice / 10).toFixed(2);
    const grandTotal = (totalPrice + shipping + Number(tax)).toFixed(2);

    const forMatNumber = (num) => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4 className="bg-danger p-3 border">Order Summery</h4>
            <p>Item Ordered: {cart.length} </p>
            <p>Product price: {forMatNumber(totalPrice)} </p>
            <p>Shipping : {shipping} </p>
            <p>Tax + vat: {tax} </p>
            <p>Total price: { grandTotal} </p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;