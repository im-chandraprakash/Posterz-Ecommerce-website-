import React, { useState } from "react";
import Hero from "../../components/hero/Hero";
import Category from "../../components/category/Category";
import Product from "../../components/product/Product";
import "./Home.scss";
import { axiosClient } from "../../utils/axiosClient";
import { useSelector } from "react-redux";

function Home() {
    const [topProduct, setTopProduct] = useState(null);
    const categories = useSelector((state) => state.categoryReducer.category);

    async function fetchData() {
        const productResponse = await axiosClient(
            "/products?filters[isTopPick][$eq]=true&populate=image"
        );
        setTopProduct(productResponse.data.data);
    }

    useState(() => {
        fetchData();
    }, []);
    return (
        <div className="Home">
            <Hero />
            <section className="collection container">
                <div className="info">
                    <h2 className="heading">Shop By Categories</h2>
                    <p className="subheading">
                        Shop from the best, our Film and TV Posters Collection.
                    </p>
                </div>
                <div className="content">
                    {categories?.map((category, id) => (
                        <Category key={id} category={category} />
                    ))}
                </div>
            </section>
            <section className="collection container">
                <div className="info">
                    <h2 className="heading">Our Top picks</h2>
                    <p className="subheading">
                        All New Designs, Same Old Details.
                    </p>
                </div>
                <div className="content">
                    {topProduct?.map((product, id) => (
                        <Product key={id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;
