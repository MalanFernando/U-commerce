import axios from 'axios';
import '../css/productDetail.css'
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterCategoryProducts } from '../store/slices/products.slice';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { addProductToCart } from '../store/slices/cart.slice';
import {increment} from '../store/slices/counter.slice'
import { motion } from 'framer-motion';

const ProductDetail = () => {

    const [productDetail, setProductDetail] = useState({})
    const [quantity, setQuantity] = useState(1)

    const products = useSelector(state => state.products)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams()
    
    useEffect(() => {
        window.scrollTo({
            top: 50,
            behavior: 'smooth'
        });
        axios.get(`https://e-commerce-api.academlo.tech/api/v1/products/`)
            .then(res => {
                const response = res.data.data.products;
                // console.log(response);
                const productDetailFind = response.find((prod) => prod.id === Number(id))
                // console.log(productDetailFind);
                setProductDetail(productDetailFind);
                dispatch(filterCategoryProducts(productDetailFind.category.id))
                // console.log(dispatch(filterCategoryProducts(productDetailFind.category.id)));
            })
    }, [id, dispatch])
    // console.log(productDetail);

    const addToCart = () => {
        const productChoose = {
            id: id,
            quantity
        }
        if (localStorage.getItem("token")) {
            dispatch(addProductToCart(productChoose))
            dispatch(increment())
        } else {
            navigate("/login")
        }
        // console.log(productChoose);
    }

    return (
        <section className='product-detail'>
            <section className='content-product_detail content'>
                <div className='detail-content'>
                    <motion.div className='cont-slider'>
                            <motion.div 
                                className='slider' 
                                drag='x'
                                dragConstraints={{right:0, left:-447.614}}
                            >
                                {
                                    productDetail.productImgs?.map(img=> (
                                    <motion.div className='item-img' key={img}>
                                        <img className='img-product' src={img} alt="" />
                                    </motion.div>
                                ))
                                }
                            </motion.div>
                    </motion.div>
                </div>
                <article className='detail-info'>
                    <h3 className='info-title'>{productDetail?.title}</h3>
                    <span className='info-price'><sup>$</sup> {productDetail?.price}</span>
                    <p className='info-description'>{productDetail?.description}</p>
                    <div className='info-btns_interactive'>
                        <div className='interac-quantity'>
                            <button 
                                className='btn-min btns-format' 
                                onClick={()=> setQuantity(quantity - 1)}
                                disabled = {quantity <= 1}
                            >-</button>
                            <span className='quantity'>{quantity}</span>
                            <button className='btn-max btns-format' onClick={()=> setQuantity(quantity + 1)}>+</button>
                        </div>
                        <button 
                            className='interac-btn_buy btns-format'
                            onClick={addToCart}
                        >Add to cart</button>
                    </div>
                </article>
            </section>
            <section className='home-main-content'>
                <article className='home-content'>
                    <h3 className='title-discover-items'>Discover similar items</h3>
                    <div className='content-products'>
                        {
                            products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        }
                    </div>
                </article>
            </section>
        </section>
    );
};

export default ProductDetail;