import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Profile() {
  const user = {
    name: "Gaurav Kurude",
    email: "gaurav@example.com",
    phone: "9876543210",
  };

  return (
    <>
      <Header />

      <main className="container mt-4">
        <h2 className="mb-4">My Profile</h2>

        <div className="row">

          {/* Profile Details */}
          <div className="col-md-6">
            <div className="card p-4">
              <h4 className="mb-3">Personal Details</h4>

              <p>
                <strong>Name:</strong> {user.name}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="col-md-6">
            <div className="card p-4">
            <Link to="/address" className="text-decoration-none">
              Address
            </Link>
            </div>
          </div>

        </div>

        {/* Order History */}
        <div className="card p-4 mt-4">
          <h4 className="mb-3">Order History</h4>

          <Link
            to="/orders"
            className="btn btn-outline-primary"
          >
            View Order History
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Profile;