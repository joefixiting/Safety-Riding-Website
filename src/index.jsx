import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import '../tailwind.css';

// Impor LandingPage secara langsung (statis)
// Sesuaikan path ini dengan lokasi file LandingPage Anda
import { LandingPage } from "./screens/LandingPage";

const App = () => {
  return (
    // Memanggil LandingPage tanpa Layout, routing, atau Suspense
    <LandingPage />
  );
};

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <App />
  </StrictMode>
);