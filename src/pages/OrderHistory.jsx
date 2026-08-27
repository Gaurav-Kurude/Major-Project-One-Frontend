import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(
          "https://major-project-one-brown.vercel.app/orders",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();

        setOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <main>
          <div className="container mt-4">
            <h2 className="mb-4">Order History</h2>

            {orders.length === 0 ? (
              <p>No orders placed yet.</p>
            ) : (
              orders.map((order) => (
                <div className="card p-4 mb-3" key={order._id}>
                  <h5>Order ID: {order._id}</h5>

                  <p>
                    Order Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                  <hr />

                  {order.products.map((product) => (
                    <div
                      key={product.productId}
                      className="d-flex justify-content-between mb-2"
                    >
                      <span>
                        {product.productName}
                        {" × "}
                        {product.quantity}
                      </span>

                      <span>₹{product.productPrice * product.quantity}</span>
                    </div>
                  ))}

                  <hr />

                  <h5 className="text-end">Total: ₹{order.totalPrice}</h5>
                </div>
              ))
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default OrderHistory;
