import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [count, setCount] = useState(1);

  function increaseCount() {
    setCount((count) => count + 1);
    toast.success("Quantity increased!");
  }

  function decreaseCount() {
    if (count > 1) {
      setCount((count) => count - 1);
      toast.info("Quantity decreased!");
    } else {
      toast.warning("Quantity cannot be less than 1");
    }
  }

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        console.log("Product response:", data);
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-4">{error}</p>;
  }

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.productImage}
              alt={product.productName}
              className="img-fluid"
            />
          </div>

          <div className="col-md-6">
            <h2>{product.productName}</h2>

            <div className="d-flex align-items-center gap-2">
              <h4 className="mb-0">₹{product.productPrice}</h4>

              <p className="text-decoration-line-through mb-0 text-black-50">
                ₹{product.productPriceBeforeDiscount}
              </p>
            </div>

            <h6 className="text-black-50 mt-2 mx-1 fw-bolder">50% Off</h6>

            <p>⭐ {product.productRating}</p>

            <p>
              <span className="fw-medium me-3">Quantity:</span>
              <button className="btn btn-outline-secondary" onClick={decreaseCount}>-</button>
              <span className="mx-2">{count}</span>
              <button className="btn btn-outline-secondary" onClick={increaseCount}>+</button>
            </p>

            <p>{product.productDescription}</p>

            <button className="btn btn-primary">Add to Cart</button>

            <button className="btn btn-outline-secondary ms-2">
              ♡ Wishlist
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
export default ProductDetails;
