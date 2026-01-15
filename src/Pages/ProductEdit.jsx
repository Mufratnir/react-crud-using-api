import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data.data));
    api.get(`/products/${id}`).then((res) => setForm(res.data.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    await api.post(`/products/${id}`, fd);
    navigate("/");
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-5">Edit Product</h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="border p-2 w-full"
          value={form.name || ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          className="border p-2 w-full"
          value={form.category_id || ""}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
        >
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

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}

