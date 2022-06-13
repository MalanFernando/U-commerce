import React from 'react';
import '../css/cart.css'
import { useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { addPurchases } from '../store/slices/purchases.slice';

const Cart = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cartProduct = useSelector(state=> state.cart?.products)
    // console.log(cartProduct);

    const check = ()=>{
        if(cartProduct?.length > 0){
            dispatch(addPurchases())
            navigate("/purchases")
         }
    }

    return (
        <div className='content-cart'>
            <h3 className='cart-title'>Shopping Bag</h3>
            <div className='cart-cont'>
                {
                    cartProduct?.map(product => (
                        <div className='cart-item' key={product.id}>
                            <div className='item-info' onClick={() => navigate(`/productdetail/${product.id}`)}>
                                <p className='info-title'>{product.title}</p>
                                <div className='info-numbers'>
                                    <span className='num-quantity'>{product.productsInCart?.quantity}</span>
                                    <span className='num-price'><sup>$</sup>{product.price}</span>
                                </div>
                            </div>
                            {/* <button className='item-btn-trash btns-format'>
                                <i className="fa-solid fa-trash"></i>
                            </button> */}
                        </div>
                    ))
                }
            </div>
            <button className='cart-btn btns-format' onClick={check}>Checkout</button>
        </div>
    );
};

export default Cart;