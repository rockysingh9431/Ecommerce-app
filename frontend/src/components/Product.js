import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
const Product = ({ product }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded  h-40">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="h-4" className="product-title">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Rating
              rating={product.rating}
              numReviews={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as="h4">$ {product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
export default Product;
