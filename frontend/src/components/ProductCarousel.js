import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "./Message";
import Loader from "./Loader";
import { useGetTopProductQuery } from "../slice_store/productApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductQuery();
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger"></Message>
  ) : (
    <Carousel pause="hover" className="'bg-primary">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default ProductCarousel;
