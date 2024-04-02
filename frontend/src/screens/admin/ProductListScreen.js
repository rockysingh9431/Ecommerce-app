import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from "../../slice_store/productApiSlice";

const ProductListScreen = () => {
  const { data: products, refetch, isLoading, error } = useGetProductsQuery();
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const deleteHandler = (id) => {
    console.log("submit");
  };
  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>
                    <LinkContainer to={`/admin/products/${product._id}`}>
                      <Button
                        variant="light"
                        className="btn-sm mx-2"
                        onClick={() => {
                          deleteHandler(product._id);
                        }}
                      >
                        <FaTrash style={{ color: "red" }} />
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};
export default ProductListScreen;
