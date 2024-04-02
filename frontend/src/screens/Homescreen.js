import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slice_store/productApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
const Homescreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error.data.message || error.error}</div>
      ) : (
        <>
          {" "}
          <h1 className=" mt-4 text-center">Latest Products</h1>
          <Row className="m-2">
            {products.map((product) => {
              return (
                <Col
                  key={product._id}
                  className="m-0.5"
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <Product key={product._id} product={product} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
};
export default Homescreen;
