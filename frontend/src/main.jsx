import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import StoreContextProvider from "./Pages/Context/StoreContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer,Bounce } from "react-toastify";

const toastcontainerProps={
       position:"top-center",
        autoClose:2000,
        hideProgressBar:false,
        newestOnTop:false,
        closeOnClick:false,
        rtl:false,
        pauseOnFocusLoss:true,
        draggable:true,
        pauseOnHover:true,
        theme:"light",
        transition:Bounce,

}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <StoreContextProvider>
        <App />
        <ToastContainer {...toastcontainerProps}/>
      </StoreContextProvider>
    </BrowserRouter>
  </StrictMode>
);
