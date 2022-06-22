import React, { useState } from 'react';
import '../css/productCard.css'
import { Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../store/slices/cart.slice';
import {increment} from '../store/slices/counter.slice'

const ProductCard = ({product}) => {

    const [active, setActive] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productChoosed = ()=>{
        setActive(!active)
        const productChoose = {
            id: product.id,
            quantity: 1
        }
        if (localStorage.getItem("token")) {
            dispatch(addProductToCart(productChoose))
            dispatch(increment())
        } else {
            navigate("/login")
        }
    }

    return (
        <div className='product-info'>
            <Link to={`/productdetail/${product.id}`}>
                <div className='info-img'>
                    <img className='img-prod' src={product.productImgs[1]} alt="" />
                    <img className='img-over' src={product.productImgs[0]} alt="" />
                </div>
                <div className='info-detail'>
                    <span><sup>$</sup> {product.price}</span>
                    <h4>{product.title}</h4>
                </div>
            </Link>
            <button className={`info_btn ${active ? 'on' : 'off'}`} onClick={productChoosed}>
                <i className="fa-solid fa-heart"></i>
            </button>
        </div>
    );
};

export default ProductCard;