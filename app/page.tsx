"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function page() {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((respones) => {
        setProducts(respones.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleDelete = (id: string) => {
    axios
      .delete(`http://localhost:3000/api/products/${id}`)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="container mx-auto mt-8">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">STT</th>
              <th className="py-2 px-4 border-b">Tên sản phẩm</th>
              <th className="py-2 px-4 border-b">Hình ảnh</th>
              <th className="py-2 px-4 border-b">Giá</th>
              <th className="py-2 px-4 border-b">Số lượng</th>
              <th className="py-2 px-4 border-b">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="py-2 px-4 border-b">{product.price}</td>
                <td className="py-2 px-4 border-b">{product.quantity}</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-slate-500 text-white px-4 py-1 rounded">
                    Sửa
                  </button>
                  <button className="bg-red-500 text-white px-4 py-1 rounded" onClick={()=>handleDelete(product.id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded">
        <h2>Thêm mới sản phẩm</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Tên :
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            id="name"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Hình ảnh
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            id="image"
            type="image"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Giá
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            id="price"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="quantity"
          >
            Số lượng
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            id="quantity"
            type="text"
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded">
          Thêm
        </button>
      </form>
    </>
  );
}
