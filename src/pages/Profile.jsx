import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user = {
    name: "Gaurav Kurude",
    email: "gaurav@example.com",
    phone: "9876543210",
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <main>
          <div className="container mt-4">
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
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => navigate("/address")}
                  >
                    Manage Address
                  </button>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="card p-4 mt-4">
              <h4 className="mb-3">Order History</h4>

              <Link to="/orders" className="btn btn-outline-primary w-auto d-inline-block">
                View Order History
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Profile;
