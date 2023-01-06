import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import '../css/home.css'
import { filterCategoryProducts, getProducts, searchProducts } from '../store/slices/products.slice';

const Home = () => {

    const dispatch = useDispatch()

    const products = useSelector(state => state.products)
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState("")

    useEffect(()=>{
        dispatch(getProducts());

        axios.get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
            .then(res=> setCategories(res.data.data.categories))
    },[dispatch])

    // const categoriesSlice = categories.slice(0,-1);

    const productsSearched = (e)=>{
        e.preventDefault();
        dispatch(searchProducts(search))
    }

    const categorySelected = (id)=>{
        dispatch(filterCategoryProducts(id))
    }
    
    return (
        <div className='home'>
            <section className='home-select_filter'>
                <h3 className='filter-title'>Categories <i className="fa-solid fa-tags"></i></h3>
                <div className='filter-categories'>
                    <div className='categories'>
                        <button className='category-btn' onClick={()=> dispatch(getProducts())}>All</button>
                        {
                            categories.map(category=>(
                                <button className='category-btn' onClick={()=> categorySelected(category.id)} key={category.id}>
                                    {category.name === "Kitchen" && <i className="fa-solid fa-kitchen-set"></i>}
                                    {category.name === "Smart TV" && <i className="fa-solid fa-tv"></i>}
                                    {category.name === "Smartphones" && <i className="fa-solid fa-mobile-screen"></i>}
                                    {category.name === "Computers" && <i className="fa-solid fa-laptop"></i>}
                                    {category.name}
                                </button>
                            ))
                        }
                    </div>
                </div>
            </section>
            <section className='home-main-content'>
                <div className='content-filter-search'>
                    <form className='search' action="" onSubmit={productsSearched}>
                        <input 
                            className='search-input' 
                            type="text" 
                            placeholder='search...'
                            value={search}
                            onChange={e=> setSearch(e.target.value)}
                        />
                        <button className='search-btn btns'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                    <button className='filter-btn btns'>
                        <i className="fa-solid fa-sliders"></i>
                    </button>
                </div>
                <section className='home-content'>
                    <article className='content-products'>
                        {
                            products.map(product=>(
                            <ProductCard key={product.id} product={product}/>
                            ))
                        }
                    </article>
                </section>
            </section>
        </div>
    );
};

export default Home;