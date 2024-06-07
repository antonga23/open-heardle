import React, { useState, useCallback } from 'react';
import { Music2, RefreshCw } from 'lucide-react';
import { LoginButton } from './components/LoginButton';
import { GameBoard } from './components/GameBoard';
import { useSpotifyAuth } from './hooks/useSpotifyAuth';
import { useSpotifyTrack } from './hooks/useSpotifyTrack';
import type { GameState } from './types';

function App() {
  const { isAuthenticated, isLoading: isAuthLoading, error: authError, login } = useSpotifyAuth();
  const { track, isLoading: isTrackLoading, error: trackError } = useSpotifyTrack(isAuthenticated);
  const [gameState, setGameState] = useState<GameState>({
    currentAttempt: 0,
    maxAttempts: 6,
    snippetDuration: 1,
    isPlaying: false,
    hasWon: false,
    guesses: [],
  });

  const handlePlayPause = () => {
    setGameState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const handleGuess = useCallback((trackId: string) => {
    if (!track) return;

    setGameState(prev => {
      const isCorrect = trackId === track.id;
      const newGuesses = [...prev.guesses, trackId];
      
      return {
        ...prev,
        currentAttempt: prev.currentAttempt + 1,
        snippetDuration: Math.min(16, prev.snippetDuration * 2),
        guesses: newGuesses,
        hasWon: isCorrect,
      };
    });
  }, [track]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-2">
            <Music2 className="text-green-500" size={32} />
            <h1 className="text-2xl font-bold">Heardle</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          {isAuthLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent" />
            </div>
          ) : !isAuthenticated ? (
            <div className="flex flex-col items-center gap-4 py-12">
              <h2 className="text-xl font-medium">Connect your Spotify account to play</h2>
              {authError && (
                <p className="text-red-400 text-sm">{authError}</p>
              )}
              {/* use the login function from the hook to handle the login flow */}
              <LoginButton onLogin={login} isLoading={isAuthLoading} />
            </div>
          ) : isTrackLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent" />
            </div>
          ) : trackError ? (
            <div className="text-center py-12">
              <p className="text-red-400 mb-4">{trackError}</p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            </div>
          ) : track ? (
            <GameBoard
              currentTrack={track}
              gameState={gameState}
              onPlayPause={handlePlayPause}
              onGuess={handleGuess}
            />
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;