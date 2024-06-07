import { useEffect, useState, useCallback } from 'react';
import { spotify } from '../lib/spotify';

export function useSpotifyAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const accessToken = await spotify.getAccessToken();
      setIsAuthenticated(!!accessToken);
    } catch (error) {
      setError('Authentication failed. Please try again.');
      console.error('Auth error:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(async () => {
    try {
      await spotify.authenticate();
      await checkAuth();
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
    }
  }, [checkAuth]);

  return { isAuthenticated, isLoading, error, login };
}