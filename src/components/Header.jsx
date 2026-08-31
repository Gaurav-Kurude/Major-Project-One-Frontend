import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();

    if (search.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(search)}`);
    } else {
      navigate("/products");
    }
  }

  useEffect(() => {
    function updateWishlistCount() {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      setWishlistCount(wishlist.length);
    }

    updateWishlistCount();

    window.addEventListener("wishlistUpdated", updateWishlistCount);

    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
    };
  }, []);

  useEffect(() => {
    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const totalQuantity = cart.reduce(
        (total, item) => total + (item.quantity || 1),
        0,
      );

      setCartCount(totalQuantity);
    }

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/shopping-bags.png"
            alt="Shopping bag"
            width="35"
            height="35"
            className="me-2"
          />
          MyCart
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Search */}
          <form
            className="d-flex mx-lg-auto my-3 my-lg-0 search-bar w-100"
            role="search"
            onSubmit={handleSearch}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="btn btn-primary flex-shrink-0" type="submit">
              Search
            </button>
          </form>

          {/* Wishlist + Cart */}
          <div className="d-flex align-items-center gap-3">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="text-decoration-none position-relative"
            >
              <img src="/heart.png" alt="Wishlist" width="32" height="32" />

              {wishlistCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="text-decoration-none position-relative">
              <img src="/cart.png" alt="Cart" width="32" height="32" />

              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile */}
            <Link to="/profile" className="text-decoration-none">
              <img src="/user.png" alt="Profile" width="32" height="32" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
