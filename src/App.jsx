import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/products/category/:category"
        element={<ProductListing />}
      />
      <Route path="/products/:id"
      element={<ProductDetails />}
      />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
    
  );
}

export default App;