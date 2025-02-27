import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { AlertTriangle } from 'lucide-react';

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertTriangle className="w-8 h-8" />
          <h2 className="text-xl font-semibold">Something went wrong</h2>
        </div>
        <p className="text-gray-600 mb-4">
          We're sorry, but an error occurred. Our team has been notified and is working on it.
        </p>
        <pre className="bg-gray-50 p-4 rounded text-sm mb-4 overflow-auto">
          {error.message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          className="w-full bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
}