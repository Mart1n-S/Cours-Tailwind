import { createContext, useEffect, useState, ReactNode } from 'react';

interface GlobalErrorContextType {
  apiDown: boolean;
  clearError: () => void;
}

export const GlobalErrorContext = createContext<GlobalErrorContextType>({
  apiDown: false,
  clearError: () => {},
});

export const GlobalErrorProvider = ({ children }: { children: ReactNode }) => {
  const [apiDown, setApiDown] = useState(false);

  useEffect(() => {
    const handleApiError = () => {
      setApiDown(true);

      // Le toast disparaît automatiquement après 5s
      setTimeout(() => setApiDown(false), 5000);
    };

    window.addEventListener('api-error', handleApiError);
    return () => window.removeEventListener('api-error', handleApiError);
  }, []);

  const clearError = () => setApiDown(false);

  return (
    <GlobalErrorContext.Provider value={{ apiDown, clearError }}>
      {children}

      {/* Toast affiché en haut à droite */}
      {apiDown && (
        <div className="fixed top-4 right-4 bg-red-600 text-white px-4 py-3 rounded shadow-lg animate-fade-in">
          <p className="font-semibold">⚠️ Erreur réseau</p>
          <p className="text-sm">Le serveur ne répond pas. Réessayez plus tard.</p>
          <button
            onClick={clearError}
            className="text-sm underline mt-1 hover:text-gray-200"
          >
            Fermer
          </button>
        </div>
      )}
    </GlobalErrorContext.Provider>
  );
};
