import React from 'react';
import '../css/purchases.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { getPurchases } from '../store/slices/purchases.slice';

const Purchases = () => {

    const purchases = useSelector(state => state.purchases);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getPurchases())
    },[dispatch])

    const options = {year: 'numeric', month: 'long', day: 'numeric'};

    return (
        <section className='purchases content'>
            <article className='content-purchases'>
                <h2 className='purchases-title'>Purchases History</h2>
                <ul className='purchases-items'>
                    {
                        purchases.map(purchase => (
                            <li className='item-products' key={purchase.id}>
                                <h4 className='products-title'>
                                    {
                                        new Date(purchase.createdAt).toLocaleDateString(undefined, options)
                                    }
                                </h4>
                                {
                                    purchase.cart.products.map(product => (
                                        <div className='product' onClick={() => navigate(`/productdetail/${product.id}`)} key={product.id}>
                                            <img src="" alt="" />
                                            <p className='prod-title'>{product.title}</p>
                                            <span className='prod-quantity'><h5>Quantity:</h5> {product.productsInCart.quantity}</span>
                                            <span className='prod-price'><sup>$</sup>{product.price}</span>
                                        </div>
                                    ))
                                }
                            </li>
                        ))
                    }
                </ul>
            </article>
        </section>
    );
};

export default Purchases;