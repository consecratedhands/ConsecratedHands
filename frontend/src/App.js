import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import GetInvolved from "./pages/GetInvolved";
import Donate from "./pages/Donate";
import DonationSuccess from "./pages/DonationSuccess";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/donation/success" element={<DonationSuccess />} />
        </Routes>
      </Layout>
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}

export default App;
