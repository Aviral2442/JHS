import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <ThemeProvider> */}
    <Toaster position="top-right" reverseOrder={false} />
    <AppWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppWrapper>
    {/* </ThemeProvider> */}
  </StrictMode>,
);
