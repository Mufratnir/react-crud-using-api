
import React from 'react';
import { Link } from 'react-router-dom';

function ProductDetails() {
        return (
          <div>
            <div className="bg-gray-200 container mx-auto py-3.5 px-2">
              <div className="flex flex-col justify-center items-center gap-2 ">
                <h1 className="font-bold text-4xl">Product Name</h1>
                <p className="text-gray-600">Product Category</p>
                <img src="" alt="Product Image" />
                 <Link to="/" > 
                <button className="bg-blue-500 px-9 py-1.5 rounded-sm text-white ">
                  {" "}
                  Back{" "}
                </button>
                </Link>
              </div>
            </div>
          </div>
        );
}

export default ProductDetails;