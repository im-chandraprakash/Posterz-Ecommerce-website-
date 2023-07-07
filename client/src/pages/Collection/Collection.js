import React, { useEffect, useState } from "react";
import "./Collection.scss";
import Product from "../../components/product/Product";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { useSelector } from "react-redux";

function Collection() {
    const params = useParams();
    const [categoryId, setCategoryId] = useState("");
    const navigate = useNavigate();
    const [categoryItem, setCategoryItem] = useState(null);
    const categories = useSelector((state) => state.categoryReducer.category);

    const sortOptions = [
        {
            value: "Price - Low to High",
            sort: "price",
        },
        {
            value: "Newest First",
            sort: "createdAt",
        },
    ];

    const [sortBy, setSortBy] = useState(sortOptions[0].sort);

    async function fetchData() {
        let url = params.categoryId
            ? `/products?populate=image&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}`
            : `/products?populate=image&sort=${sortBy}`;
        const productResponse = await axiosClient.get(url);
        setCategoryItem(productResponse?.data.data);
    }

    useEffect(() => {
        fetchData();
        setCategoryId(params.categoryId);
    }, [params, sortBy]);
    function updateCategory(e) {
        navigate(`/category/${e.target.value}`);
    }

    return (
        <div className="Categories">
            <div className="container">
                <div className="header">
                    <div className="info">
                        <h2>Explore All Print and ArtWork</h2>
                        <p>
                            India's largest collection of wall posters for your
                            bedroom, living room, kids room, kitchen and posters
                            & art prints at highest quality lowest price
                            guaranteed.
                        </p>
                    </div>
                    <div className="sort-by">
                        <div className="sort-by-container">
                            <h3 className="sort-by-text">Sort By</h3>
                            <select
                                className="select-sort-by"
                                name="sort-by"
                                id="sort-by"
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                {sortOptions.map((sortItem) => (
                                    <option
                                        key={sortItem.sort}
                                        value={sortItem.sort}
                                    >
                                        {sortItem.value}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="filter-box">
                        <div className="category-filter">
                            <h3>Category</h3>

                            {categories.map((item, id) => (
                                <div key={id} className="filter-radio">
                                    <input
                                        type="radio"
                                        name="category"
                                        id={item.id}
                                        value={item.attributes.key}
                                        onChange={updateCategory}
                                        checked={
                                            item.attributes.key == categoryId
                                        }
                                    />
                                    <label htmlFor={item.id}>
                                        {item.attributes.title}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="product-box">
                        {categoryItem?.map((item, id) => (
                            <Product key={id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Collection;
