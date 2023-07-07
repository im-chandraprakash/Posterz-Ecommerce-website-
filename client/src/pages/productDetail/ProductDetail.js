import React, { useEffect, useState } from "react";
import dummyImg from "../../Assets/naruto.jpeg";
import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";


function ProductDetail() {

    const dispatch = useDispatch();
    const params = useParams();
    const [product, setProduct] = useState(null);
    const cart  = useSelector((state) => state.cartReducer.cart);

    const quantity = cart.find(item => item.key == params.productId)?.quantity || 0;  
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const productResponse = await axiosClient.get(
            `/products?filters[key][$eq]=${params.productId}&populate=*`
        );

        if (productResponse.data.data.length > 0) {
            setProduct(productResponse.data.data[0]);
        }
    }
    return (
        <div className="ProductDetail">
            <div className="container">
                <div className="product-layout">
                    <div className="product-img center">
                        <div className="img-container">
                            <img
                                src={
                                    product?.attributes.image.data.attributes
                                        .url
                                }
                                alt="Naruto Img"
                            />
                        </div>
                    </div>
                    <div className="product-info">
                        <h1 className="heading">{product?.attributes.title}</h1>
                        <h3 className="price">₹ {product?.attributes.price}</h3>
                        <p className="description">
                            {product?.attributes.desc}
                        </p>
                        <div className="cart-options">
                            <div className="quantity-selector">
                                <span
                                    className="btn decrement"
                                    onClick={() =>
                                        dispatch(removeFromCart(product))
                                    }
                                >
                                    -
                                </span>
                                <span className="quantity">{quantity}</span>
                                <span
                                    className="btn increment"
                                    onClick={() => dispatch(addToCart(product))}
                                >
                                    +
                                </span>
                            </div>
                            <button className="btn-primary add-to-cart">
                                Add to Cart
                            </button>
                        </div>

                        <div className="return-policy">
                            <ul>
                                <li>
                                    This product is made to order and is
                                    typically printed in 3-6 working days. Your
                                    entire order will ship out together.
                                </li>
                                <li>
                                    Since this product is printed on demand
                                    especially for you, it is not eligible for
                                    cancellations and returns. Read our Return
                                    Policy.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
