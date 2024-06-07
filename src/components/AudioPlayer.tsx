import React, { useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string;
  isPlaying: boolean;
  snippetDuration: number;
  onPlayPause: () => void;
}

export function AudioPlayer({ audioUrl, isPlaying, snippetDuration, onPlayPause }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.pause();
            onPlayPause();
          }
        }, snippetDuration * 1000);
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isPlaying, snippetDuration, onPlayPause]);

  return (
    <div className="flex items-center justify-center space-x-4">
      <audio ref={audioRef} src={audioUrl} />
      <button
        onClick={onPlayPause}
        className="p-4 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-200"
          style={{ width: `${(snippetDuration / 16) * 100}%` }}
        />
      </div>
    </div>
  );
}