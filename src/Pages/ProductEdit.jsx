import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import TiptapEditor from "../Components/TiptapEditor";

export default function ProductEdit() {
  const { id } = useParams(); // get product id from URL
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    category_id: "",
    status: true,
    thumbnail: null,
    description: "",
    existingThumbnail: "", // for preview
  });

  // Fetch categories
  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data.data));
  }, []);

  // Fetch existing product
  useEffect(() => {
    if (!id) return;
    api
      .get(`/products/${id}`)
      .then((res) => {
        const product = res.data.data;
        setForm({
          name: product.name || "",
          category_id: product.category_id || "",
          status: product.status === 1,
          thumbnail: null, // user can change
          existingThumbnail: product.thumbnail || "", // show preview
          description: product.description || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();

    fd.append("name", form.name.trim());
    fd.append("category_id", form.category_id);
    fd.append("status", form.status ? 1 : 0);
    fd.append("description", form.description || "");
    if (form.thumbnail) {
      fd.append("thumbnail", form.thumbnail);
    }

    try {
      const res = await api.post(`/products/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Updated:", res.data);
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-5">Edit Product</h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          className="border p-2 w-full"
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <div>
          {form.existingThumbnail && !form.thumbnail && (
            <img
              src={form.existingThumbnail}
              alt="Thumbnail"
              className="w-32 h-32 object-cover mb-2"
            />
          )}
          <input
            type="file"
            onChange={(e) => setForm({ ...form, thumbnail: e.target.files[0] })}
          />
        </div>

        <select
          className="border p-2 w-full"
          value={form.status ? 1 : 0}
          onChange={(e) => setForm({ ...form, status: e.target.value === "1" })}
        >
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>

        <div className="max-w-2xl mx-auto mt-4">
          <TiptapEditor
            value={form.description}
            onChange={(html) =>
              setForm((prev) => ({ ...prev, description: html }))
            }
          />
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
