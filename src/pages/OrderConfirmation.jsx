import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function OrderConfirmation() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1">
        <div className="container text-center mt-5">
          <div className="card p-5">
            <h2 className="text-success mb-3">
              ✓ Order Placed Successfully!
            </h2>

            <p className="mb-4">
              Thank you for your order. Your order has been placed successfully.
            </p>

            <div>
              <Link to="/orders" className="btn btn-primary me-2">
                View Order History
              </Link>

              <Link to="/products" className="btn btn-outline-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default OrderConfirmation;