import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductListing() {

  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [rating, setRating] = useState(0);
  const [sortPrice, setSortPrice] = useState("");

    useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "http://localhost:5000/"
        );products

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
         console.log(data);
        setProducts(data);
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

    return categoryMatch && ratingMatch;
  });

    const sortedProducts = [...filteredProducts].sort(
    (a, b) => {
      if (sortPrice === "lowToHigh") {
        return a.price - b.price;
      }

      if (sortPrice === "highToLow") {
        return b.price - a.price;
      }

      return 0;
    }
  );

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
                    id="mens"
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
                    id="womens"
                    onChange={() => handleCategoryChange("Women's Clothing")}
                  />

                  <label className="form-check-label" htmlFor="womens">
                    Women's Clothing
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

                        <button className="btn btn-outline-secondary w-100">
                          ♡ Add to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ProductListing;
