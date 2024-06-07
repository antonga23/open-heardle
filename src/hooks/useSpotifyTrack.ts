import { useEffect, useState } from 'react';
import { spotify } from '../lib/spotify';
import type { Track } from '../types';

export function useSpotifyTrack(isAuthenticated: boolean) {
  const [track, setTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomTrack = async (attemptedTrackIds: Set<string> = new Set()) => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const response = await spotify.currentUser.tracks.savedTracks(49);
        
        if (!response.items.length) {
          setError('No saved tracks found. Please save some tracks to your Spotify library.');
          console.log('No saved tracks found');
          return;
        }

        // Get available tracks that haven't been attempted
        const availableTracks = response.items.filter(
          item => !attemptedTrackIds.has(item.track.id)
        );

        if (availableTracks.length === 0) {
          setError('No tracks with preview URLs found. Try refreshing or adding more tracks.');
          console.log('All tracks attempted, none have preview URLs');
          return;
        }

        const randomIndex = Math.floor(Math.random() * availableTracks.length);
        const spotifyTrack = availableTracks[randomIndex].track;

        // Add this track to attempted tracks
        attemptedTrackIds.add(spotifyTrack.id);

        if (!spotifyTrack.preview_url) {
          console.log(`Track ${spotifyTrack.id} has no preview URL, trying another...`);
          return fetchRandomTrack(attemptedTrackIds);
        }

        setTrack({
          id: spotifyTrack.id,
          title: spotifyTrack.name,
          artist: spotifyTrack.artists[0].name,
          previewUrl: spotifyTrack.preview_url,
        });
      } catch (error) {
        setError('Failed to load track. Please try again.');
        console.error('Error fetching track:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRandomTrack();
  }, [isAuthenticated]);

  return { track, isLoading, error };
}