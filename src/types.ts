export type ItemSection = 'movies' | 'series' | 'anime';
export type ItemStatus = 'Watching' | 'Watched' | 'To Watch';

export interface WatchlistItem {
  id: string;
  title: string;
  category: string;
  status: ItemStatus;
  rating: number | null;
  notes: string;
  coverImage: string | null;
  dateAdded: string;
  totalEpisodes?: number;
  checkedEpisodes?: number[];
}

export interface WatchlistDatabase {
  movies: WatchlistItem[];
  series: WatchlistItem[];
  anime: WatchlistItem[];
}
