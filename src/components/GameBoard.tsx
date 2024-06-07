import React from 'react';
import { AudioPlayer } from './AudioPlayer';
import { GuessInput } from './GuessInput';
import type { Track, GameState } from '../types';

interface GameBoardProps {
  currentTrack: Track;
  gameState: GameState;
  onPlayPause: () => void;
  onGuess: (trackId: string) => void;
}

export function GameBoard({ currentTrack, gameState, onPlayPause, onGuess }: GameBoardProps) {
  return (
    <div className="space-y-8">
      <AudioPlayer
        audioUrl={currentTrack.previewUrl || ''}
        isPlaying={gameState.isPlaying}
        snippetDuration={gameState.snippetDuration}
        onPlayPause={onPlayPause}
      />

      <div className="space-y-4">
        <GuessInput
          onGuess={onGuess}
          disabled={gameState.hasWon || gameState.currentAttempt >= gameState.maxAttempts}
        />

        <div className="grid grid-cols-1 gap-2">
          {Array.from({ length: gameState.maxAttempts }).map((_, index) => {
            const guess = gameState.guesses[index];
            
            return (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  guess
                    ? guess === currentTrack.id
                      ? 'bg-green-900 border-green-500'
                      : 'bg-red-900 border-red-500'
                    : 'border-gray-700'
                }`}
              >
                {guess ? (
                  <div>
                    <div className="font-medium">{currentTrack.title}</div>
                    <div className="text-gray-400">{currentTrack.artist}</div>
                  </div>
                ) : (
                  <div className="h-12 flex items-center justify-center text-gray-500">
                    Skip or make a guess
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {(gameState.hasWon || gameState.currentAttempt >= gameState.maxAttempts) && (
        <div className={`p-4 rounded-lg ${
          gameState.hasWon ? 'bg-green-900' : 'bg-red-900'
        }`}>
          <p className="text-center font-medium">
            {gameState.hasWon
              ? `Congratulations! You guessed it in ${gameState.currentAttempt} ${
                  gameState.currentAttempt === 1 ? 'try' : 'tries'
                }!`
              : `Game Over! The song was "${currentTrack.title}" by ${currentTrack.artist}`}
          </p>
        </div>
      )}
    </div>
  );
}