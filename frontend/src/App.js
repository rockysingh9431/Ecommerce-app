import { Provider } from "react-redux";
import store from "./slice_store/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const App = () => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <div className="min-h-screen bg-gray-50">
            <RouterProvider router={router} />
          </div>
        </PayPalScriptProvider>
      </Provider>
      <ToastContainer />
    </HelmetProvider>
  );
};
export default App;
