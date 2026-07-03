import { useState } from 'react';

export default function DeleteConfirm({ productName, onConfirm, onCancel }) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    await onConfirm();
    setDeleting(false);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="confirm-box">
        <div className="confirm-icon">🗑️</div>
        <h3>Delete Product</h3>
        <p>
          Are you sure you want to delete <strong>"{productName}"</strong>?
          This action cannot be undone.
        </p>
        <div className="confirm-actions">
          <button className="btn-cancel" onClick={onCancel} disabled={deleting}>
            Cancel
          </button>
          <button className="btn-delete" onClick={handleConfirm} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
