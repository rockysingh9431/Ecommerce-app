import { useParams, Link } from "react-router-dom";
import { useGetProductsQuery } from "../slice_store/productApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import ProductCarousel from "../components/ProductCarousel";
// import Paginate from "../components/Paginate";
// import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const { keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
  });
  return (
    <div className="mt-6 py-16 px-20 z-0">
      <div className="relative py-6">
        <h1 className="text-center text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 mb-8 tracking-widest drop-shadow-lg">
          Shop the Latest Collection
        </h1>
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-20 h-1 bg-gradient-to-r from-indigo-500 to-transparent"></div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-20 h-1 bg-gradient-to-l from-yellow-500 to-transparent"></div>
      </div>

      {keyword ? (
        <button id="backBtn" className="ml-12 rounded-md p-3 bg-gray-300">
          <Link to="/">Go Back</Link>
        </button>
      ) : (
        <div className="mx-auto">{/* <ProductCarousel /> */}</div>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error.data?.message || error.error}</div>
      ) : (
        <>
          <ProductCarousel />
          <div className="flex justify-center lg:justify-between  flex-wrap p-6">
            {data.products.map((product) => {
              return (
                <div
                  key={product._id}
                  className="rounded-md bg-white mb-10 shadow-lg  shadow-gray-300 m-auto p-2 h-[330px] w-[18vw] xl:min-w-56 min-w-72"
                >
                  <Product key={product._id} product={product} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default HomeScreen;
