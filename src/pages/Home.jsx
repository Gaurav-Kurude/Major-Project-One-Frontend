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
      image: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdvbWVucyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 3,
      name: "Kids",
      image: "https://images.unsplash.com/photo-1760287363879-6012adab292c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGtpZHMlMjBmYXNoaW9ufGVufDB8fDB8fHww",
    },
    {
      id: 4,
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVsZWN0cm9uaWNzfGVufDB8fDB8fHww",
    },
    {
      id: 5,
      name: "Home",
      image: "https://media.istockphoto.com/id/1345589509/photo/household-appliances-different-appliances-on-counter-in-the-kitchen.webp?a=1&b=1&s=612x612&w=0&k=20&c=10s7IcFuwuZHlIX-8GQS_US4APMd2QrcY2PN2IBYYt0=",
    },
  ];
  return (
    <>
      <Header />
      <main>
        <div className="container mt-3">
          <div className="row g-3">
            {categories.map((category) => (
              <div className="col" key={category.id}>
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
            <img className="img-fluid w-100" height={400} src="https://plus.unsplash.com/premium_photo-1677995700941-100976883af7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTd8fHNob3BwaW5nJTIwaW1hZ2VzJTIwMTA3MCUyMHglMjA0MDB8ZW58MHx8MHx8fDA%3D" alt="Image" />
          </div>
          <div className="row">
            <div className="mt-3 col-md-6">
              <img width={510} height={400} src="https://plus.unsplash.com/premium_photo-1683141052679-942eb9e77760?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hvcHBpbmclMjBpbWFnZXMlMjAxMDcwJTIweCUyMDQwMHxlbnwwfHwwfHx8MA%3D%3D" alt="Image" />
            </div>
            <div className="mt-3 col-md-6">
              <img width={510} height={400} src="https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvcHBpbmclMjBpbWFnZXMlMjAxMDcwJTIweCUyMDQwMHxlbnwwfHwwfHx8MA%3D%3D" alt="Image" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
