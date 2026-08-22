import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);
  }, []);

  function removeFromWishlist(productId) {
    const updatedWishlist = wishlist.filter(
      (product) => product._id !== productId
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    toast.info("Product removed from wishlist!");
  }

  function addToCart(product) {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = existingCart.find(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

      toast.success("Quantity increased in cart!");
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];

      toast.success("Product added to cart!");
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  return (
    <>
      <Header />

      <main className="container mt-4">
        <h2 className="mb-4">My Wishlist</h2>

        {wishlist.length === 0 ? (
          <p className="text-center">
            Your wishlist is empty.
          </p>
        ) : (
          <div className="row g-4">
            {wishlist.map((product) => (
              <div className="col-md-4" key={product._id}>
                <div className="card h-100">
                  <img
                    src={product.productImage}
                    className="card-img-top"
                    alt={product.productName}
                  />

                  <div className="card-body">
                    <h5 className="card-title">
                      {product.productName}
                    </h5>

                    <h6>₹{product.productPrice}</h6>

                    <p>
                      ⭐ {product.productRating}
                    </p>

                    <button
                      className="btn btn-primary w-100 mb-2"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>

                    <button
                      className="btn btn-outline-danger w-100"
                      onClick={() =>
                        removeFromWishlist(product._id)
                      }
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
    </>
  );
}

export default Wishlist;