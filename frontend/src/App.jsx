import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./Components/Layout";
import Menu from "./Pages/Menu";
import About from "./Pages/About";
import Contact_us from "./Pages/Contact_us";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import { useState } from "react";
import Cart from "./Pages/Cart/Cart";
import CartDelivery from "./Pages/Cart/CartDelivery";
import { ToastContainer } from "react-bootstrap";
import Privacy_policy from "./Pages/Extra/Privacy_policy";
import Terms_Of_Use from "./Pages/Extra/Terms_Of_Use";
import Verify from "./Pages/verify/Verify";
import Myorder from "./Pages/MyOrder/Myorder";
import Profile from "./Pages/Extra/Profile";




function App() {
  const [showlogin, setShowLogin] = useState(false);

  return (
    <>
     <ToastContainer/>
      <Routes>
        <Route path="/"element={<Layout showlogin={showlogin} setShowLogin={setShowLogin} />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:category" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact_us" element={<Contact_us />} />
          <Route path="/cart" element={<Cart setShowLogin={setShowLogin} />} />
          <Route path="/cart/delivery" element={<CartDelivery/>}/>
          <Route path="/privacy_policy" element={<Privacy_policy/>}/>
          <Route path='/terms_of_use' element={<Terms_Of_Use/>}/>
          <Route path="/verify" element={<Verify/>} />
          <Route path="/myorder" element={<Myorder/>}/>
          <Route path="/profile" element={<Profile/>}/>
          
          
        </Route>
      </Routes>

      {showlogin && <Login setShowLogin={setShowLogin} />}
    </>
  );
}

export default App;
