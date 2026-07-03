export default function Toast({ toasts, onRemove }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <span>{toast.type === 'success' ? '✓' : '✕'}</span>
          <span>{toast.message}</span>
          <button className="toast-close" onClick={() => onRemove(toast.id)}>×</button>
        </div>
      ))}
    </div>
  );
}
