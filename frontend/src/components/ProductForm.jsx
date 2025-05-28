import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

function ProductForm({ productId, onSave, onCancel, onShowNotification }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
          const product = response.data.data;
          setName(product.name);
          setPrice(product.price);
          setStock(product.stock);
          setDescription(product.description);
          setCurrentImageUrl(product.image_url);
        } catch (error) {
          console.error('Error fetching product:', error);
          onShowNotification('Gagal memuat data produk untuk diedit.', 'error');
        }
      }
    };
    fetchProduct();
  }, [productId, onShowNotification]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('description', description);

    if (image) {
      formData.append('image', image);
    }

    try {
      if (productId) {
        formData.append('_method', 'PUT');
        await axios.post(`${API_BASE_URL}/products/${productId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        onShowNotification('Produk berhasil diperbarui!', 'success');
      } else {
        await axios.post(`${API_BASE_URL}/products`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        onShowNotification('Produk berhasil ditambahkan!', 'success');
      }
      onSave();
    } catch (error) {
      console.error('Error saving product:', error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
        onShowNotification('Validasi gagal. Mohon periksa kembali input Anda.', 'error');
      } else {
        onShowNotification('Gagal menyimpan produk. Mohon coba lagi.', 'error');
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-lg mx-auto bg-white rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {productId ? 'Edit Produk' : 'Tambah Produk Baru'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Harga</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            step="0.01"
            required
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price[0]}</p>}
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock[0]}</p>}
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description[0]}</p>}
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Gambar Produk</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            accept="image/*"
          />
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image[0]}</p>}
          {currentImageUrl && !image && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Gambar saat ini:</p>
              <img src={currentImageUrl} alt="Current Product" className="mt-1 w-32 h-32 object-cover rounded-md border border-gray-200" />
            </div>
          )}
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200 font-semibold"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
          >
            {productId ? 'Update Produk' : 'Simpan Produk'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;