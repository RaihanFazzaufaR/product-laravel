import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ProductForm from './components/ProductForm';
import NotificationModal from './components/NotificationModal';
import ConfirmationModal from './components/ConfirmationModal';
import DetailModal from './components/DetailModal';

function App() {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [currentPageView, setCurrentPageView] = useState('list');
  const [editingProductId, setEditingProductId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const API_BASE_URL = 'http://localhost:8000/api';

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  };

  const closeNotification = () => {
    setNotification({ message: '', type: '' });
  };


  const fetchProducts = useCallback(async (page = 1, search = searchTerm) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`, {
        params: {
          page: page,
          search: search,
        },
      });
      setProducts(response.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.error('Error fetching products:', error);
      showNotification('Gagal memuat produk. Mohon coba lagi.', 'error');
    }
  }, [searchTerm]);


  const handleDeleteClick = (id) => {
    setProductToDeleteId(id);
    setShowConfirmModal(true);
  };

  const confirmDeleteProduct = async () => {
    setShowConfirmModal(false);
    if (productToDeleteId) {
      try {
        await axios.delete(`${API_BASE_URL}/products/${productToDeleteId}`);
        showNotification('Produk berhasil dihapus!', 'success');
        fetchProducts(meta.current_page || 1, searchTerm);
      } catch (error) {
        console.error('Error deleting product:', error);
        showNotification('Gagal menghapus produk. Mohon coba lagi.', 'error');
      } finally {
        setProductToDeleteId(null);
      }
    }
  };

  const cancelDeleteProduct = () => {
    setShowConfirmModal(false);
    setProductToDeleteId(null);
  };

  useEffect(() => {
    fetchProducts(1, searchTerm);
  }, [fetchProducts, searchTerm]);

  const renderContent = () => {
    switch (currentPageView) {
      case 'list':
        return (
          <div className="p-4 max-w-5xl mx-auto font-sans">
            <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">Daftar Produk</h1>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <button
                onClick={() => setCurrentPageView('add')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 w-full sm:w-auto"
              >
                Tambah Produk Baru
              </button>
              <input
                type="text"
                placeholder="Cari produk berdasarkan nama..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {products.length > 0 ? (
                products.map(p => (
                  <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
                    <img
                      src={ p.image }
                      alt={p.name}
                      className="w-full h-52 object-cover rounded-lg mb-4 border border-gray-200"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/400x300/E0E0E0/333333?text=No+Image`;
                      }}
                    />
                    <h2 className="font-bold text-xl mt-2 text-gray-900">{p.name}</h2>
                    <p className="text-gray-700 text-lg mt-1">Rp. {p.price}</p>
                    <p className="text-gray-600 text-sm">Stok: {p.stock}</p>
                    <div className="flex gap-3 mt-4 w-full justify-center">
                      <button
                        onClick={() => {
                          setEditingProductId(p.id);
                          setCurrentPageView('detail');
                        }}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 font-semibold text-sm"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => {
                          setEditingProductId(p.id);
                          setCurrentPageView('edit');
                        }}
                        className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200 font-semibold text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(p.id)}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 font-semibold text-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-600 text-lg">Tidak ada produk ditemukan.</p>
              )}
            </div>

            {meta.links && meta.links.length > 3 && (
              <div className="mt-8 flex justify-center flex-wrap gap-2">
                {meta.links.map((link, index) => {
                  if (!link.url && (link.label === '&laquo; Previous' || link.label === 'Next &raquo;')) {
                    return null;
                  }

                  const pageNumber = link.url ? new URL(link.url).searchParams.get('page') : null;

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (link.url) {
                          fetchProducts(pageNumber, searchTerm);
                        }
                      }}
                      disabled={!link.url}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition duration-200
                        ${link.active
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'}
                        ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                      
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  );
                })}
              </div>
            )}

            {showConfirmModal && (
              <ConfirmationModal
                message="Apakah Anda yakin ingin menghapus produk ini?"
                onConfirm={confirmDeleteProduct}
                onCancel={cancelDeleteProduct}
              />
            )}
          </div>
        );
      case 'detail':
        return (
          <DetailModal
            productId={editingProductId}
            onClose={() => setCurrentPageView('list')}
            onShowNotification={showNotification}
          />
        );
      case 'add':
        return (
          <ProductForm
            onSave={() => {
              setCurrentPageView('list');
              fetchProducts();
            }}
            onCancel={() => setCurrentPageView('list')}
            onShowNotification={showNotification}
          />
        );
      case 'edit':
        return (
          <ProductForm
            productId={editingProductId}
            onSave={() => {
              setCurrentPageView('list');
              fetchProducts(meta.current_page || 1);
              setEditingProductId(null);
            }}
            onCancel={() => {
              setCurrentPageView('list');
              setEditingProductId(null);
            }}
            onShowNotification={showNotification}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <NotificationModal
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />
      {/* Render the main content based on the current page view */}
      {renderContent()}
    </>
  );
}

export default App;

