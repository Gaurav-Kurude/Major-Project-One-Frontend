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

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/shopping-bags.png"
            alt="Shopping bag"
            width="35"
            height="35"
            className="me-2"
          />
          MyShoppingSite
        </Link>

        <form
          className="d-flex mx-auto search-bar"
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

          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>

        <div className="d-flex align-items-center gap-3">
          <Link
            to="/wishlist"
            className="text-decoration-none position-relative fs-4"
          >
            <img src="/heart.png" alt="heart" width="35" height="35" className="me-2" />
            {wishlistCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="text-decoration-none position-relative fs-4"
          >
            🛒
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
