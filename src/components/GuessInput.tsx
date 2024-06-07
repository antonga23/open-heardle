import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { spotify } from '../lib/spotify';
import type { Track } from '../types';

interface GuessInputProps {
  onGuess: (songId: string) => void;
  disabled: boolean;
}

export function GuessInput({ onGuess, disabled }: GuessInputProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchTracks = async () => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setIsSearching(true);
        const response = await spotify.search(query, ['track'], undefined, 5);
        
        const tracks = response.tracks.items.map(track => ({
          id: track.id,
          title: track.name,
          artist: track.artists[0].name,
          previewUrl: track.preview_url
        }));
        
        setSearchResults(tracks);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounce = setTimeout(searchTracks, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          placeholder="Search for a song..."
          disabled={disabled}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
        />
        {isSearching ? (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-green-500 border-t-transparent" />
          </div>
        ) : (
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        )}
      </div>
      
      {showSuggestions && query && searchResults.length > 0 && (
        <div className="absolute w-full mt-1 bg-gray-700 rounded-lg shadow-lg border border-gray-600 max-h-60 overflow-y-auto z-10">
          {searchResults.map(track => (
            <button
              key={track.id}
              onClick={() => {
                onGuess(track.id);
                setQuery('');
                setShowSuggestions(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-600 focus:bg-gray-600 text-white"
            >
              <div className="font-medium">{track.title}</div>
              <div className="text-sm text-gray-400">{track.artist}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}