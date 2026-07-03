import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Toast from './components/Toast';

export default function AdminApp() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // Check current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (loading) {
    return (
      <div className="login-wrapper">
        <div className="admin-loading">
          <div className="spinner" />
          Loading...
        </div>
      </div>
    );
  }

  return (
    <>
      {session ? (
        <Dashboard
          session={session}
          onLogout={handleLogout}
          showToast={showToast}
        />
      ) : (
        <LoginForm showToast={showToast} />
      )}
      <Toast toasts={toasts} onRemove={removeToast} />
    </>
  );
}
