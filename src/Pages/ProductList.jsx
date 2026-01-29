import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import SearchBar from "../Components/search";
import Pagination from "../Components/pagination";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products", {
        params: {
          search: searchText,
          page,
          per_page: 2,
        },
      });

      setProducts(res?.data?.data || []);
      setMeta(res?.data?.meta || null);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete product?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchText, page]);

  if (loading) {
    return <p className="p-10 text-gray-600">Loading products...</p>;
  }

  if (error) {
    return <p className="p-10 text-red-600">{error}</p>;
  }

  return (
    <div className="p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        <h1 className="text-2xl font-bold">Products</h1>

        <div className="flex gap-2">
          <SearchBar
            search={search}
            setSearch={setSearch}
            onSearch={() => {
              setSearchText(search);
              setPage(1);
            }}
            placeholder="Search product..."
          />

          <Link
            to="/create"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Product
          </Link>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <>
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="border p-2">{p.name}</td>
                  <td className="border p-2">
                    {p.category?.name ?? "-"}
                  </td>
                  <td className="border p-2">
                    {p.thumbnail ? (
                      <img
                        src={`http://127.0.0.1:8000/storage/${p.thumbnail}`}
                        className="w-12 h-12 object-cover rounded"
                        alt={p.name}
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="border p-2">
                    {p.status ? "Active" : "Inactive"}
                  </td>
                  <td className="border p-2 space-x-2">
                    <Link to={`/edit/${p.id}`} className="text-blue-600">
                      Edit
                    </Link>
                    <Link to={`/details/${p.id}`}>
                      <button className="text-green-600">Details</button>
                    </Link>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {meta && (
            <Pagination meta={meta} onPageChange={(p) => setPage(p)} />
          )}
        </>
      )}
    </div>
  );
}
