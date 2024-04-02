import { Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useGetProductsQuery } from "../slice_store/productApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
const Homescreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  return (
    <>
      {keyword ? (
        <Link to="/" className="btn mt-3 btn-light">
          Go Back
        </Link>
      ) : (
        <ProductCarousel />
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error.data.message || error.error}</div>
      ) : (
        <>
          {" "}
          <h1 className=" mt-4 text-center">Latest Products</h1>
          <Row className="m-2">
            {data.products.map((product) => {
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
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};
export default Homescreen;
