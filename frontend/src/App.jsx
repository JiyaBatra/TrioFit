import React from "react";
import { Routes, Route } from "react-router-dom";


// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import Frequentlyaskedques from "./pages/Frequentlyaskedques";
import CareerOpportunities from "./pages/CarrerOppornuties";
import PrivacyAndPolicy from "./pages/PrivacyAndPolicy";
import ReturnAndExchange from "./pages/ReturnAndExchange";
import ReturnPolicy from "./pages/ReturnPolicy";
import SupportTeam from "./pages/SupportTeam";
import TermsAndCondition from "./pages/TermsAndCondition";
import AboutUs from "./pages/AboutUs";
import Stores from "./pages/OurStore";
import SeeMorePage from "./pages/SeeMorePage";
import Women from "./pages/Women";
import Men from "./pages/Men";
import Kids from "./pages/Kids";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import SellerDashboard from "./pages/SellerDashboard";




function App() {
  return (
    <>
      <Header />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/faq" element={<Frequentlyaskedques />} />
        <Route path="/careers" element={<CareerOpportunities />} />
        <Route path="/privacy" element={<PrivacyAndPolicy />} />
        <Route path="/returns" element={<ReturnAndExchange />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/support" element={<SupportTeam />} />
        <Route path="/terms" element={<TermsAndCondition />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/Women" element={<Women />} />
        <Route path="/Men" element={<Men />} />
        <Route path="/Kids" element={<Kids />} />
      <Route path="/see-more/:id" element={<SeeMorePage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/OrderSuccess" element={<OrderSuccess />} />
      
      </Routes>

      <Footer />
    </>
  );
}

export default App;
