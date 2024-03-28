import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

const Homescreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get("/api/products");
    setProducts(data);
  };
  return (
    <>
      <h1 className=" mt-4 text-center">Latest Products</h1>
      <Row className="m-2">
        {products.map((product) => {
          return (
            <Col className="m-0.5" xs={12} sm={6} md={4} lg={3}>
              <Product key={product._id} product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};
export default Homescreen;
