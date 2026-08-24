import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [rating, setRating] = useState(0);
  const [sortPrice, setSortPrice] = useState("");

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:5000/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        // console.log(data);
        setProducts(data);

        // console.log("API data:", data);
        // console.log("Is Array:", Array.isArray(data));
      } catch (error) {
        console.log(error);
      }
    }

    fetchProducts();
  }, []);

  function handleCategoryChange(categoryName) {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== categoryName),
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  }

  function clearFilters() {
    setSelectedCategories([]);
    setRating(0);
    setSortPrice("");
  }

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.productCategory);

    const ratingMatch = product.productRating >= rating;

    const searchMatch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return categoryMatch && ratingMatch && searchMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortPrice === "lowToHigh") {
      return a.productPrice - b.productPrice;
    }

    if (sortPrice === "highToLow") {
      return b.productPrice - a.productPrice;
    }

    return 0;
  });

  // console.log("products:", products);
  // console.log("filteredProducts:", filteredProducts);
  // console.log("sortedProducts:", sortedProducts);

  function addToWishlist(product) {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadyExists = existingWishlist.some(
      (item) => item._id === product._id,
    );

    if (alreadyExists) {
      toast.info("Product is already in wishlist!");
      return;
    }

    const updatedWishlist = [...existingWishlist, product];

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    window.dispatchEvent(new Event("wishlistUpdated"));

    toast.success("Product added to wishlist!");
  }

  function addToCart(product) {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = existingCart.find(
      (item) => item._id === product._id,
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );

      toast.info("Quantity increased in cart!");
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];

      toast.success("Product added to cart!");
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));
  }

  return (
    <>
      <Header />
      <main>
        <div className="container mt-4">
          <h2 className="mb-4">Products</h2>

          <div className="row">
            <div className="col-md-3">
              <div className="card p-3">
                <h5>Filters</h5>

                <hr />

                <h6>Category</h6>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="womens"
                    checked={selectedCategories.includes("Women's Clothing")}
                    onChange={() => handleCategoryChange("Women's Clothing")}
                  />

                  <label className="form-check-label" htmlFor="womens">
                    Women's Clothing
                  </label>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="mens"
                    checked={selectedCategories.includes("Mens Clothing")}
                    onChange={() => handleCategoryChange("Mens Clothing")}
                  />

                  <label className="form-check-label" htmlFor="mens">
                    Men's Clothing
                  </label>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="kids"
                    checked={selectedCategories.includes("Kid's Clothing")}
                    onChange={() => handleCategoryChange("Kid's Clothing")}
                  />

                  <label className="form-check-label" htmlFor="kids">
                    Kid's Clothing
                  </label>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="electronics"
                    checked={selectedCategories.includes("Electronics")}
                    onChange={() => handleCategoryChange("Electronics")}
                  />

                  <label className="form-check-label" htmlFor="electronics">
                    Electronics
                  </label>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="home"
                    checked={selectedCategories.includes("Home")}
                    onChange={() => handleCategoryChange("Home")}
                  />

                  <label className="form-check-label" htmlFor="home">
                    Home
                  </label>
                </div>

                <hr />

                <h6>Ratings</h6>

                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                />

                <p>Rating: {rating}+</p>

                <hr />

                <h6>Price</h6>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="price"
                      id="lowToHigh"
                      value="lowToHigh"
                      checked={sortPrice === "lowToHigh"}
                      onChange={(e) => setSortPrice(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="lowToHigh">
                      Low to High
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="price"
                      id="highToLow"
                      value="highToLow"
                      checked={sortPrice === "highToLow"}
                      onChange={(e) => setSortPrice(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="highToLow">
                      High To Low
                    </label>
                  </div>
                </div>

                <button
                  className="btn btn-outline-danger"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            </div>

            <div className="col-md-9">
              {sortedProducts.length === 0 ? (
                <div className="text-center mt-5">
                  <h5>No products found</h5>

                  {searchTerm && <p>No products found for "{searchTerm}"</p>}
                </div>
              ) : (
                <div className="row g-4">
                  {sortedProducts.map((product) => (
                    <div className="col-md-4" key={product._id}>
                      <div className="card h-100">
                        <Link
                          to={`/products/${product._id}`}
                          className="text-decoration-none text-black"
                        >
                          <img
                            src={product.productImage}
                            className="card-img-top"
                            alt={product.productName}
                          />
                        </Link>

                        <div className="card-body">
                          <h5 className="card-title">{product.productName}</h5>

                          <h6>₹{product.productPrice}</h6>

                          <p className="mb-3">⭐ {product.productRating}</p>

                          <button className="btn btn-primary w-100 mb-2">
                            Add to Cart
                          </button>

                          <button
                            className="btn btn-outline-secondary w-100"
                            onClick={() => addToWishlist(product)}
                          >
                            ♡ Add to Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default ProductListing;
