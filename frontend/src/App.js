import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Mission from "./pages/Mission";
import Mentorship from "./pages/Mentorship";
import Volunteer from "./pages/Volunteer";
import Donate from "./pages/Donate";
import Prayer from "./pages/Prayer";
import Contact from "./pages/Contact";
import DonationSuccess from "./pages/DonationSuccess";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/prayer" element={<Prayer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/donation/success" element={<DonationSuccess />} />
        </Routes>
      </Layout>
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}

export default App;
