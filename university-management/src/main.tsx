// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify";

import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./main.css";
import App from "./App.tsx";
import { MobileProvider } from "./context/mobileContext";


createRoot(document.getElementById("main-container")!).render(

  <BrowserRouter>
    {/* <StrictMode> */}

    <MobileProvider>
      <App />
      <ToastContainer />
    </MobileProvider>

    {/* </StrictMode> */}
  </BrowserRouter>

);