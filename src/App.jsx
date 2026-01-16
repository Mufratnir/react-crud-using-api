import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./Pages/ProductList.jsx";
import ProductCreate from "./Pages/ProductCreate.jsx";
import ProductEdit from "./Pages/ProductEdit.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
function App() {
  return (
     <BrowserRouter>
       <Routes>

            <Route path="/" element={<ProductList />} />
            <Route path="/create" element={<ProductCreate />} />
            <Route path="/details/:id" element={<ProductDetails />} />
            <Route path="/edit/:id" element={<ProductEdit />} />
          </Routes>
        </BrowserRouter>
  );
}

export default App;
