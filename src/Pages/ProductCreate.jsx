import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import TiptapEditor from "../Components/TiptapEditor";

export default function ProductCreate() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category_id: "",
    status: true,
    thumbnail: null,
    description: "",
  });

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();

    fd.append("name", form.name.trim());
    fd.append("category_id", form.category_id);
    fd.append("status", form.status ? 1 : 0); // send as integer
    fd.append("description", form.description || "");
    if (form.thumbnail) {
      fd.append("thumbnail", form.thumbnail);
    }

    try {
      const res = await api.post("/products", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Created:", res.data);
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-5">Create Product</h2>

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

        <input
          type="file"
          onChange={(e) => setForm({ ...form, thumbnail: e.target.files[0] })}
        />

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
            value={form.description} // pass current value
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
