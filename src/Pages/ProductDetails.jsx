import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data.data) , console.log(setProduct))
      .catch((err) => console.error(err));
     
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="bg-gray-200 container mx-auto py-3.5 px-2">
        <div className="flex flex-col justify-center items-center gap-2 ">
          <h1 className="font-bold text-4xl">{product.name}</h1>
          <p className="text-gray-600">{product.category?.name || "-"}</p>
          <img
            src={product.thumbnail || "/placeholder.jpg"}
            alt={product.name}
          />
          <Link to="/">
            <button className="bg-blue-500 px-9 py-1.5 rounded-sm text-white ">
              {" "}
              Back{" "}
            </button>
          </Link>
          <div
            className="max-w-2xl text-center"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
