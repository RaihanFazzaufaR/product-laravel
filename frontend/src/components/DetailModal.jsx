import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';
const STORAGE_BASE_URL = 'http://localhost:8000/storage';

function DetailModal({ productId, onClose, onShowNotification }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    // const [errors, setErrors] = useState(null); // Dihapus karena tidak digunakan

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
                    setImage(product.image);
                } catch (error) {
                    console.error('Error fetching product details:', error);
                    onShowNotification('Gagal memuat detail produk. Mohon coba lagi.', 'error');
                }
            }
        };
        fetchProduct();
    }, [productId, onShowNotification]);

    return (
        <div
            className="flex flex-col items-center justify-center fixed inset-0 z-[100] bg-white bg-opacity-75 transition-opacity duration-300"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Detail Produk</h2>
                {/* Tombol Close di pojok kanan atas */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                <div className="mb-4 text-center">
                    <img
                        src={ image }
                        alt={name}
                        className="w-full h-full object-cover rounded-md mb-4 border border-gray-200 mx-auto" // mx-auto untuk center
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/400x300/E0E0E0/333333?text=No+Image`; // Placeholder jika gambar error
                        }}
                    />
                    <h3 className="text-xl font-bold mb-1 text-gray-900">{name}</h3>
                    <h4 className="text-gray-700 text-lg">Rp. {price}</h4>
                    <h4 className="text-gray-600 text-base">Stok: {stock !== null && stock !== '' ? stock : '-'}</h4> {/* Peningkatan */}
                    <h4 className="text-gray-600 text-base mt-2">Deskripsi: {description || 'Tidak ada deskripsi.'}</h4> {/* Peningkatan */}
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DetailModal;