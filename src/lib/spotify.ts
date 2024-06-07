import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const CLIENT_ID = 'c4243e0063824e4ca58023ea8c6071dc'; // Replace with your Spotify Client ID
const REDIRECT_URI = 'http://localhost:5173/callback';
const SCOPES = ['streaming', 'user-read-email', 'user-read-private', 'user-library-read'];

export const spotify = SpotifyApi.withUserAuthorization(
  CLIENT_ID,
  REDIRECT_URI,
  SCOPES
);