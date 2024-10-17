import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import Message from "./Message";
import { useGetTopProductQuery } from "../slice_store/productApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductQuery();

  return isLoading ? (
    <></>
  ) : error ? (
    <Message success={false} />
  ) : (
    <div className="mx-auto w-full md:w-3/4 lg:w-2/3 p-4 bg-gray-100 rounded-lg shadow-lg">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        stopOnHover={true}
        className="rounded-lg overflow-hidden"
      >
        {products.map((product) => (
          <div key={product._id} className="relative">
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[300px] object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white p-4 rounded-b-lg">
                <h2 className="text-xl font-bold">
                  {product.name} (${product.price})
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
