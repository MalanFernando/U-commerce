import React from 'react';
import '../css/cart.css'
import { useSelector, useDispatch} from 'react-redux';
import {decrement} from '../store/slices/counter.slice'
import {useNavigate} from 'react-router-dom'
import { addPurchases } from '../store/slices/purchases.slice';
import { getCart, removeProductToCart } from '../store/slices/cart.slice';
import { useEffect } from 'react';

const Cart = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cartProducts = useSelector(state=> state.cart.products)

    // console.log(cartProducts);

    useEffect(()=>{
        dispatch(getCart())
    },[dispatch])
    
    const deleteProduct = (id)=>{
        dispatch(removeProductToCart(id));
        if (cartProducts.length <= 0) {
            dispatch(decrement(0))
        }else{
            dispatch(decrement())
        }
    }
    
    const check = ()=>{
        if(cartProducts.length > 0){
            dispatch(addPurchases())
            navigate("/purchases")
         }
    }

    return (
        <div className='content-cart'>
            <h3 className='cart-title'>Shopping Bag</h3>
            <div className='cart-cont'>
                {
                    cartProducts?.length === 0 ? 
                        <p className='text-alternative'>Don't exist any product choosed</p>
                        :
                    cartProducts?.map(product => (
                        <div className='cart-item' key={product.id}>
                            <div className='item-info' onClick={() => navigate(`/productdetail/${product.id}`)}>
                                <p className='info-title'>{product.title}</p>
                                <div className='info-numbers'>
                                    <span className='num-quantity'>{product.productsInCart?.quantity}</span>
                                    <span className='num-price'><sup>$</sup>{product.price}</span>
                                </div>
                            </div>
                            <button 
                                className='item-btn-trash btns-format' 
                                onClick={()=>deleteProduct(product.id)}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    ))
                }
            </div>
            <button className='cart-btn btns-format' onClick={check}>Checkout</button>
        </div>
    );
};

export default Cart;