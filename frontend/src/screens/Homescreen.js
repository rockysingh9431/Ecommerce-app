import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import products from "../products";

const Homescreen = () => {
  return (
    <>
      <h1 className=" mt-4 text-center">Latest Products</h1>
      <Row className="m-2">
        {products.map((product) => {
          return (
            <Col className="m-0.5" xs={12} sm={6} md={4} lg={3}>
              <Product key={product._id} product={product}/>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
export default Homescreen;
