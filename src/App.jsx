import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "@/components/pages/HomePage";
import Gallery from "@/components/pages/Gallery";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="!bg-surface/95 !border !border-primary-500/20"
      />
    </>
  );
}

export default App;