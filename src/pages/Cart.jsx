import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  // Increase quantity
  function increaseQuantity(productId) {
    const updatedCart = cart.map((product) =>
      product._id === productId
        ? {
            ...product,
            quantity: product.quantity + 1,
          }
        : product,
    );

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  // Decrease quantity
  function decreaseQuantity(productId) {
    const updatedCart = cart
      .map((product) =>
        product._id === productId
          ? {
              ...product,
              quantity: product.quantity - 1,
            }
          : product,
      )
      .filter((product) => product.quantity > 0);

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  // Remove product
  function removeFromCart(productId) {
    const updatedCart = cart.filter((product) => product._id !== productId);

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));

    toast.info("Product removed from cart!");
  }

  // Add cart product to wishlist
  function addToWishlist(product) {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadyExists = existingWishlist.some(
      (item) => item._id === product._id,
    );

    if (alreadyExists) {
      toast.info("Product is already in wishlist!");
      return;
    }

    const updatedWishlist = [...existingWishlist, product];

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    window.dispatchEvent(new Event("wishlistUpdated"));

    toast.success("Product added to wishlist!");
  }

  const totalItems = cart.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  function calculateFinalPrice(originalPrice, discountPercentage) {
    const discountAmount = (originalPrice * discountPercentage) / 100;

    return originalPrice - discountAmount;
  }

  // Calculate total price
  const totalPrice = cart.reduce((total, product) => {
    const finalPrice = calculateFinalPrice(
      product.productPriceBeforeDiscount,
      product.productDiscount,
    );

    return total + finalPrice * product.quantity;
  }, 0);

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <main>
          <div className="container mt-4">
            <h2 className="mb-4">My Cart</h2>

            {cart.length === 0 ? (
              <p className="text-center">Your cart is empty.</p>
            ) : (
              <div className="row">
                {/* Cart Products */}
                <div className="col-md-8">
                  {cart.map((product) => (
                    <div className="card mb-3" key={product._id}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={product.productImage}
                            className="img-fluid rounded-start"
                            alt={product.productName}
                          />
                        </div>

                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">
                              {product.productName}
                            </h5>

                            <div className="d-flex align-items-center gap-2">
                              <h6 className="mb-0">
                                ₹
                                {calculateFinalPrice(
                                  product.productPriceBeforeDiscount,
                                  product.productDiscount,
                                )}
                              </h6>

                              <small className="text-decoration-line-through text-black-50">
                                ₹{product.productPriceBeforeDiscount}
                              </small>
                            </div>

                            <small className="text-success">
                              {product.productDiscount}% Off
                            </small>

                            <p>⭐ {product.productRating}</p>

                            {/* Quantity */}
                            <div className="d-flex align-items-center mb-3">
                              <span className="me-3">Quantity:</span>

                              <button
                                className="btn btn-outline-secondary"
                                onClick={() => decreaseQuantity(product._id)}
                              >
                                -
                              </button>

                              <span className="mx-3">{product.quantity}</span>

                              <button
                                className="btn btn-outline-secondary"
                                onClick={() => increaseQuantity(product._id)}
                              >
                                +
                              </button>
                            </div>

                            {/* Actions */}
                            <button
                              className="btn btn-outline-primary me-2"
                              onClick={() => addToWishlist(product)}
                            >
                              ♡ Add to Wishlist
                            </button>

                            <button
                              className="btn btn-outline-danger"
                              onClick={() => removeFromCart(product._id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Details */}
                <div className="col-md-4">
                  <div className="card p-3">
                    <h5>Price Details</h5>

                    <hr />

                    <div className="d-flex justify-content-between">
                      <span>Products</span>
                      <span>{totalItems}</span>
                    </div>

                    <div className="d-flex justify-content-between mt-2">
                      <span>Total Price</span>
                      <strong>₹{totalPrice}</strong>
                    </div>

                    <hr />

                    <Link to="/checkout" className="btn btn-primary w-100">
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />

        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </>
  );
}
export default Cart;
