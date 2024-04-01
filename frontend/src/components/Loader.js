import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      className="my-3"
      animation="border"
      role="status"
      style={{
        height: "70px",
        width: "70px",
        margin: "auto",
        display: "block",
      }}
    ></Spinner>
  );
};
export default Loader;
