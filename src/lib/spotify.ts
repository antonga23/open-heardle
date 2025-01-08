import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI as string || 'http://localhost:5173/callback';
const SCOPES = ['streaming', 'user-read-email', 'user-read-private', 'user-library-read'];

export const spotify = SpotifyApi.withUserAuthorization(
  CLIENT_ID,
  REDIRECT_URI,
  SCOPES
);