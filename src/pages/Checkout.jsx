import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];

    const selectedAddress = savedAddresses.find(
      (address) => address.selected === true,
    );

    setCart(savedCart);
    setAddress(selectedAddress);
  }, []);

  function calculateFinalPrice(originalPrice, discountPercentage) {
    const discountAmount = (originalPrice * discountPercentage) / 100;

    return originalPrice - discountAmount;
  }

  const totalPrice = cart.reduce((total, product) => {
    const finalPrice = calculateFinalPrice(
      product.productPriceBeforeDiscount,
      product.productDiscount,
    );

    return total + finalPrice * product.quantity;
  }, 0);

  async function placeOrder() {
    if (!address) {
      toast.error("Please select a delivery address");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // 1. Create order data
    const orderData = {
      products: cart.map((product) => ({
        productId: product._id,
        productName: product.productName,

        productPrice: calculateFinalPrice(
          product.productPriceBeforeDiscount,
          product.productDiscount,
        ),

        originalPrice: product.productPriceBeforeDiscount,
        discount: product.productDiscount,

        quantity: product.quantity,
      })),

      address: {
        name: address.name,
        phone: address.phone,
        address: address.address,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      },

      totalPrice: totalPrice,
    };

    try {
      // 2. Send order to your backend
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      // 3. Get backend response
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to place order");
      }

      console.log("Order saved:", data);

      // Clear cart
      localStorage.removeItem("cart");

      // Update cart count
      window.dispatchEvent(new Event("cartUpdated"));

      toast.success("Order Placed Successfully!");

      // Go to Order History
      navigate("/orders");
    } catch (error) {
      console.log(error);

      toast.error("Failed to place order");
    }
  }

  return (
    <>
      <Header />

      <main className="container mt-4">
        <h2>Checkout</h2>

        {/* Order Summary */}
        <div className="card p-4 mt-3">
          <h4>Order Summary</h4>

          {cart.map((product) => (
            <div
              key={product._id}
              className="d-flex justify-content-between border-bottom py-2"
            >
              <div>
                <p className="mb-1">{product.productName}</p>

                <small>
                  ₹
                  {calculateFinalPrice(
                    product.productPriceBeforeDiscount,
                    product.productDiscount,
                  )}{" "}
                  × {product.quantity}
                </small>
              </div>

              <strong>
                ₹
                {calculateFinalPrice(
                  product.productPriceBeforeDiscount,
                  product.productDiscount,
                ) * product.quantity}
              </strong>
            </div>
          ))}

          <div className="d-flex justify-content-between mt-3">
            <h5>Total</h5>
            <h5>₹{totalPrice}</h5>
          </div>
        </div>

        {/* Address */}
        <div className="card p-4 mt-3">
          <h4>Delivery Address</h4>

          {address ? (
            <>
              <strong>{address.name}</strong>

              <p className="mb-1">{address.address}</p>

              <p className="mb-1">
                {address.city}, {address.state} - {address.pincode}
              </p>

              <p>Phone: {address.phone}</p>
            </>
          ) : (
            <p className="text-danger">Please select a delivery address.</p>
          )}

          <button className="btn btn-primary" onClick={placeOrder}>
            Place Order
          </button>
        </div>

        {/* Success message */}
        {orderPlaced && (
          <div className="alert alert-success mt-3">
            Order Placed Successfully!
          </div>
        )}
      </main>

      <Footer />

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default Checkout;
