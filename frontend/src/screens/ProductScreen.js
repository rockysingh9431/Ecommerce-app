import { useParams, Link } from "react-router-dom";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slice_store/productSlice";
import Loader from "../components/Loader";
import { useState } from "react";
import {
  Form,
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  Container,
  Button,
} from "react-bootstrap";
import { addToCart } from "../slice_store/cartSlice";
import { useDispatch } from "react-redux";
const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message || error.error}</Message>
      ) : (
        <Container>
          <div className="mt-5">
            <Link to="/" className="btn btn-light mb-2">
              Back to Home
            </Link>
            <Row>
              <Col md={5}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>

              <Col md={4}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>{product.description}</ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      rating={product.rating}
                      numReviews={`${product.numReviews} reviews`}
                    />{" "}
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

                  <ListGroup.Item>
                    <Link to={`/product/${product._id}`}></Link>
                  </ListGroup.Item>
                </ListGroup>
              </Col>

              <Col md={3} className="mt-3 ">
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          <strong>
                            {product.countInStock > 0
                              ? "Available 🟢"
                              : "Out Of Stock"}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Quantity</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={quantity}
                              onChange={(e) =>
                                setQuantity(Number(e.target.value))
                              }
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => {
                                  return (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  );
                                }
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <span className="ms-2">
                        ${(quantity * product.price).toFixed(2)}
                      </span>
                      <Button
                        className="btn block ms-7"
                        type="button"
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      )}
    </>
  );
};
export default ProductScreen;
