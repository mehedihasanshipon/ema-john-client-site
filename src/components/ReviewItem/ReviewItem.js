import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price} = props.product;
    return (
        <div className = "container">
            <h4 className = "product-name"> {name} </h4>
            <p className ="lead"> {quantity} </p>
            <p>{price}</p>
            <button onClick = {()=> props.removeProduct(key)}
             className = "main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;