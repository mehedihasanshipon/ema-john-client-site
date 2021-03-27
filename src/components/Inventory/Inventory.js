import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    const handleAddProduct= ()=>{
        const product = {}
        fetch('http://localhost:3002/addProduct',{
            method:"POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body:JSON.stringify(product)
        })
    }
    return (
        <div>
            <form action="">
                <p><span>Name:</span> <input type="text"/> </p>
                <p><span>Price:</span><input type="text"/></p>
                <p><span>Quantity</span><input type="text"/></p>
                <p><span>Product Image:</span><input type="file"/></p>
                <button onClick={handleAddProduct}>Add product</button>
            </form>
        </div>
    );
};

export default Inventory;