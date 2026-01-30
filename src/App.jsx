import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./Pages/ProductList.jsx";
import ProductCreate from "./Pages/ProductCreate.jsx";
import ProductEdit from "./Pages/ProductEdit.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import Login from "./Pages/auth/Login.jsx";
import Register from "./Pages/auth/Signup.jsx";
import RequireAuth from "./auth/RequireAuth.jsx";
import Navbar from "./Components/Navbar.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/create"
            element={
              <RequireAuth>
                <ProductCreate />
              </RequireAuth>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <RequireAuth>
                <ProductEdit />
              </RequireAuth>
            }
          />
          <Route
            path="/details/:id"
            element={
              <RequireAuth>
                <ProductDetails />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
