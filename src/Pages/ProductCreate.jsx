import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "../Components/RichTextEditor";

export default function ProductCreate() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category_id: "",
    status: 1,
    thumbnail: null,
  });

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    await api.post("/products", fd);
    navigate("/");
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-5">Create Product</h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Product Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
        >
          <option>Select Category</option>
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
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>

        <RichTextEditor onChange={(html) => setForm({ ...form, description: html })} />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
