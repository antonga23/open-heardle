import React from 'react';
import { LogIn } from 'lucide-react';

interface LoginButtonProps {
  onLogin: () => void;
  isLoading?: boolean;
}

export function LoginButton({ onLogin, isLoading }: LoginButtonProps) {
  return (
    <button
      onClick={onLogin}
      disabled={isLoading}
      className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-800 disabled:cursor-not-allowed text-white rounded-full font-medium transition-colors"
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
      ) : (
        <LogIn size={20} />
      )}
      {isLoading ? 'Connecting...' : 'Login with Spotify'}
    </button>
  );
}