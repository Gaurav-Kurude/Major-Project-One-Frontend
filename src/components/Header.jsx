function Header() {
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

          <button className="btn btn-secondary" type="submit">
            Login
          </button>
          <p>⁠🤍</p>
          <p>🛒</p>
        </div>
      </nav>
    </>
  );
}

export default Header;
