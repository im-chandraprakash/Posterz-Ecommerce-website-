import React from "react";
import "./Cart.scss";
import { AiOutlineClose } from "react-icons/ai";
import CartItem from "../cartItem/CartItem";
import { useSelector } from "react-redux";
import { BsCartX } from "react-icons/bs";
import { axiosClient } from "../../utils/axiosClient";
import { loadStripe } from "@stripe/stripe-js";

function Cart({ onClose }) {
    const cart = useSelector((state) => state.cartReducer.cart);
    let totalAmount = 0;
    cart.forEach((item) => (totalAmount += item.quantity * item.price));

    let isCartEmpty = cart.length === 0;

    async function handleCheckout() {
        try {
            const response = await axiosClient.post("/orders", {
                products: cart,
            });

            console.log("stripe id " , response.data.stripeId);
            const stripe = await loadStripe(
                `${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`
            );
            const data = await stripe.redirectToCheckout({
                sessionId: response.data.stripeId,
            });

            console.log("stripe data", data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="Cart">
            <div className="overlay" onClick={onClose}></div>
            <div className="cart-content">
                <div className="header">
                    <h3>Shopping Cart</h3>
                    <div className="close-btn" onClick={onClose}>
                        <AiOutlineClose />
                    </div>
                </div>
                <div className="cart-item">
                    {cart.map((item, id) => (
                        <CartItem key={id} cart={item} />
                    ))}
                </div>

                {isCartEmpty && (
                    <div className="empty-cart-info">
                        <div className="icon">
                            {" "}
                            <BsCartX />{" "}
                        </div>
                        <h4>Cart is Empty</h4>
                    </div>
                )}

                {!isCartEmpty && (
                    <div className="checkout-info">
                        <div className="total-amount">
                            <h3 className="total-message">Total</h3>
                            <div className="total-value">₹ {totalAmount}</div>
                        </div>
                        <div
                            className="checkout btn-primary"
                            onClick={handleCheckout}
                        >
                            Checkout now
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
