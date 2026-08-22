import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [wishlistCount, setWishlistCount] = useState(0);

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
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            MyShoppingSite
          </a>

          <form className="d-flex mx-auto search-bar" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <div className="d-flex align-items-center gap-3">
            <Link
              to="/wishlist"
              className="text-decoration-none position-relative fs-4"
            >
              🤍
              {wishlistCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <p className="mb-0">🛒</p>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
