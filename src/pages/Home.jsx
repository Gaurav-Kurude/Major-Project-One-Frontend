import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  const categories = [
    {
      id: 1,
      name: "Men's Clothing",
      image: "https://media.istockphoto.com/id/2271184986/photo/row-of-men-shirts-and-jackets-in-a-store.webp?a=1&b=1&s=612x612&w=0&k=20&c=dhub1ABwHo9j3iTTyCUifC5NE-e7TVh-pzD9O82hJd8=",
    },
    {
      id: 2,
      name: "Women's Clothing",
      image: "https://placehold.co/300X200",
    },
    {
      id: 3,
      name: "Kids",
      image: "https://placehold.co/300X200",
    },
    {
      id: 4,
      name: "Electronics",
      image: "https://placehold.co/300X200",
    },
    {
      id: 5,
      name: "Home",
      image: "https://placehold.co/300X200",
    },
  ];
  return (
    <>
      <Header />
      <main>
        <div className="container mt-3">
          <div className="row">
            {categories.map((category) => (
              <div className="col-md-2 mb-2" key={category.id}>
                <Link
                  to={`/products/category/${category.name
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                  className="text-decoration-none"
                >
                  <div className="card h-100">
                    <img
                      src={category.image}
                      className="card-img-top"
                      alt={category.name}
                    />

                    <div className="card-body text-center">
                      <h5 className="card-title">{category.name}</h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="mt-3">
            <img src="https://placehold.co/1070X400" alt="Image" />
          </div>
          <div className="row">
            <div className="mt-3 col-md-6">
              <img src="https://placehold.co/500X400" alt="Image" />
            </div>
            <div className="mt-3 col-md-6">
              <img src="https://placehold.co/500X400" alt="Image" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
