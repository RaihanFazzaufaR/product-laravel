function ConfirmationModal({ message, onConfirm, onCancel }) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
          <p className="text-lg font-semibold mb-4 text-gray-800">{message}</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200 font-semibold"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 font-semibold"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    );
  };

export default ConfirmationModal;