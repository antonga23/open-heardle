export interface Track {
  id: string;
  title: string;
  artist: string;
  previewUrl: string | null;
}

export interface GameState {
  currentAttempt: number;
  maxAttempts: number;
  snippetDuration: number;
  isPlaying: boolean;
  hasWon: boolean;
  guesses: string[];
}