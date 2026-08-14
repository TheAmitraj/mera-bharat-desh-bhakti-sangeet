export interface Track {
  id: number;
  title: string;
  titleEn: string;
  movieOrArtist: string;
  originalSinger?: string;
  youtubeVideoId: string;
  youtubeUrl: string;
  startTime?: number; // optional start offset in seconds
  duration: number; // in seconds
  highlightLyrics: string;
  lyricsMeaning?: string;
  category: 'timeless' | 'emotional' | 'anthem' | 'energetic';
  isCustom?: boolean;
}

export interface Quote {
  id: number;
  textHindi: string;
  authorOrContext: string;
  tag?: string;
}

export type CelebrationMode = 'auto' | '15-august' | '26-january' | 'everyday';

export interface PlayerState {
  isPlaying: boolean;
  currentTrackIndex: number;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isReady: boolean;
  isVideoVisible: boolean;
}
