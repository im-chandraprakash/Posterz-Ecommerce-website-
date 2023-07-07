import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/home/Home";
import ProductDetail from "../src/pages/productDetail/ProductDetail";
import Product from "../src/components/product/Product";
import Footer from "../src/components/Footer/Footer";
import { BrowserRouter } from "react-router-dom";
import Collection from "./pages/Collection/Collection";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategory } from "./redux/slices/categorySlice";
import Payments from "./components/payments/Payments";
function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategory());
    }, []);

    return (
        <div className="App">
            <Navbar />

            <main>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/products" element={<Product />}></Route>
                    <Route
                        path="/products/:productId"
                        element={<ProductDetail />}
                    ></Route>
                    {/* <Route path="/category" element={<Categories />}></Route> */}
                    <Route
                        path="/category/:categoryId?"
                        element={<Collection />}
                    />
                    <Route
                        path="/products/:productId"
                        element={<ProductDetail />}
                    />
                    <Route path="/payments/:status" element={<Payments />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
