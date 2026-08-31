import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Address() {
  const [addresses, setAddresses] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Load addresses
  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];

    setAddresses(savedAddresses);
  }, []);

  // Handle input
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Add / Update address
  function handleSubmit(e) {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    if (formData.pincode.length !== 6) {
      toast.error("Pincode must be 6 digits");
      return;
    }

    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (editingId !== null) {
      // Update address
      const updatedAddresses = addresses.map((address) =>
        address.id === editingId
          ? {
              ...address,
              ...formData,
            }
          : address,
      );

      setAddresses(updatedAddresses);

      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));

      toast.success("Address updated!");

      setEditingId(null);
    } else {
      // Add new address
      const newAddress = {
        id: Date.now(),
        ...formData,
        selected: false,
      };

      const updatedAddresses = [...addresses, newAddress];

      setAddresses(updatedAddresses);

      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));

      toast.success("Address added!");
    }

    // Clear form
    setFormData({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });
  }

  // Edit address
  function editAddress(address) {
    setFormData({
      name: address.name,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    });

    setEditingId(address.id);
  }

  // Delete address
  function deleteAddress(id) {
    const updatedAddresses = addresses.filter((address) => address.id !== id);

    setAddresses(updatedAddresses);

    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));

    toast.info("Address deleted!");
  }

  // Select address
  function selectAddress(id) {
    const updatedAddresses = addresses.map((address) => ({
      ...address,
      selected: address.id === id,
    }));

    setAddresses(updatedAddresses);

    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));

    toast.success("Delivery address selected!");
  }

  return (
    <>
      <Header />

      <main className="container mt-4">
        <h2 className="mb-4">My Addresses</h2>

        <div className="row">
          {/* Address Form */}
          <div className="col-md-5">
            <div className="card p-4">
              <h5 className="mb-3">
                {editingId ? "Update Address" : "Add New Address"}
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>

                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    maxLength={10}
                    inputMode="numeric"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address</label>

                  <textarea
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">City</label>

                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">State</label>

                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Pincode</label>

                  <input
                    type="text"
                    name="pincode"
                    className="form-control"
                    maxLength={6}
                    inputMode="numeric"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  {editingId ? "Update Address" : "Add Address"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="btn btn-secondary w-100 mt-2"
                    onClick={() => {
                      setEditingId(null);

                      setFormData({
                        name: "",
                        phone: "",
                        address: "",
                        city: "",
                        state: "",
                        pincode: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Address List */}
          <div className="col-md-7">
            <h5 className="mb-3">Saved Addresses</h5>

            {addresses.length === 0 ? (
              <p>No addresses added yet.</p>
            ) : (
              addresses.map((address) => (
                <div
                  className={`card p-3 mb-3 ${
                    address.selected ? "border-primary" : ""
                  }`}
                  key={address.id}
                >
                  <div className="form-check">
                    <input
                      type="radio"
                      name="deliveryAddress"
                      className="form-check-input"
                      checked={address.selected}
                      onChange={() => selectAddress(address.id)}
                    />

                    <label className="form-check-label">
                      <strong>{address.name}</strong>
                    </label>
                  </div>

                  <p className="mt-2 mb-1">{address.address}</p>

                  <p className="mb-1">
                    {address.city}, {address.state} - {address.pincode}
                  </p>

                  <p className="mb-3">Phone: {address.phone}</p>

                  <div>
                    <button
                      className="btn btn-outline-primary me-2"
                      onClick={() => editAddress(address)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteAddress(address.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default Address;
