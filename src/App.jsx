import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./Pages/ProductList.jsx";
import ProductCreate from "./Pages/ProductCreate.jsx";
import ProductEdit from "./Pages/ProductEdit.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import Login from "./Pages/auth/Login.jsx";
import Register from "./Pages/auth/Signup.jsx";
import VerifyEmail from "./Pages/auth/VerifyEmail";
import Navbar from "./Components/Navbar.jsx";
import EmailVerified from './Pages/auth/EmailVerified';
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<ProductCreate />} />
          <Route path="/edit/:id" element={<ProductEdit />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/VerifyEmail" element={<VerifyEmail />} />
          <Route path="/EmailVerified" element={<EmailVerified />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
