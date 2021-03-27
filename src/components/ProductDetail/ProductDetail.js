import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product,setProduct]= useState({});
    // console.log(products);
    useEffect(()=>{
        fetch('http://localhost:3002/product/'+productKey)
        .then(res=>res.json())
        .then(data=>setProduct(data))
    },[productKey])
    // const product = fakeData.find(pd => pd.key ===productKey);
    // console.log(product)
    return (
        <div>
            <h1>{productKey} is product Details</h1>
            <Product showAddToCart = {false} product = {product} />
        </div>
    );
};

export default ProductDetail;