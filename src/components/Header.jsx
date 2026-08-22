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
          <div className="d-flex align-items-center gap-3">
            <p className="mb-0">🤍</p>
            <p className="mb-0">🛒</p>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
