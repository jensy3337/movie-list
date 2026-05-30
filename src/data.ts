import { WatchlistDatabase } from './types';

export const stickerUrls = {
  bow: 'https://www.freepngimg.com/thumb/bow/6-bow-png-image-download.png',
  star: 'https://www.pngplay.com/wp-content/uploads/6/Pink-Star-PNG-Clipart-Background.png',
  heart: 'https://www.freepngimg.com/thumb/heart/15-heart-png-image-download.png',
  cherry: 'https://www.freepngimg.com/thumb/cherry_blossom/6-2-cherry-blossom-png-image.png',
  butterfly: 'https://www.freepngimg.com/thumb/butterfly/39-butterfly-png-image-download.png',
  cloud: 'https://www.freepngimg.com/thumb/cloud/14-cloud-png-image-download.png',
  diamond: 'https://www.freepngimg.com/thumb/diamond/11-diamond-png-image.png',
  ribbon: 'https://www.freepngimg.com/thumb/ribbon/9-ribbon-png-image-download.png',
  sparkle: 'https://www.freepngimg.com/thumb/glitter/13-glitter-png-image.png',
  strawberry: 'https://www.freepngimg.com/thumb/strawberry/3-strawberry-png-image-download.png',
  moon: 'https://www.freepngimg.com/thumb/moon/14-moon-png-image-download.png',
  rose: 'https://www.freepngimg.com/thumb/rose/9-rose-png-image-download.png'
};

export const categoriesBySection = {
  movies: ['Hindi', 'English', 'Gujarati', 'Others'],
  series: ['Hindi', 'English', 'BL', 'Others'],
  anime: ['Movies', 'Series']
};

export const initialSeed: WatchlistDatabase = {
  movies: [
    { id: "seed-m1", title: "Kabir Singh", category: "Hindi", status: "Watched", rating: 4, notes: "so dramatic but i loved it", coverImage: null, dateAdded: "2026-05-25" },
    { id: "seed-m2", title: "The Notebook", category: "English", status: "Watched", rating: 5, notes: "cried the whole time", coverImage: null, dateAdded: "2026-05-26" },
    { id: "seed-m3", title: "Chhello Divas", category: "Gujarati", status: "To Watch", rating: null, notes: "everyone keeps recommending it", coverImage: null, dateAdded: "2026-05-27" }
  ],
  series: [
    { id: "seed-s1", title: "Mirzapur", category: "Hindi", status: "Watching", rating: null, notes: "on season 2 rn", coverImage: null, dateAdded: "2026-05-28" },
    { id: "seed-s2", title: "Stranger Things", category: "English", status: "Watched", rating: 5, notes: "eleven is iconic", coverImage: null, dateAdded: "2026-05-29" },
    { id: "seed-s3", title: "My Secret Romance", category: "BL", status: "To Watch", rating: null, notes: "someone told me to watch this", coverImage: null, dateAdded: "2026-05-29" },
    { id: "bl-1", title: "Anti Reset", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-2", title: "Bad Buddy", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-3", title: "Bed Friends", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-4", title: "Blue Boys", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-5", title: "City of Stars", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-6", title: "Dark Blue Kiss", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-7", title: "I Feel You Linger in the Air", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-8", title: "Jack and Joker", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-9", title: "Kiseki 1", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-10", title: "Last Twilight", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-11", title: "Middleman's Love", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-12", title: "Only Friends", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-13", title: "Pitbabe 1", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-14", title: "Playboyy", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-15", title: "The Eclipse", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-16", title: "The Guy Next World", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-17", title: "The Heart Killers", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-18", title: "My Sweetheart Jom", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-19", title: "The On1y One", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-20", title: "Me and Thee", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-21", title: "Love in the Air", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-22", title: "Love Sea", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-23", title: "My Golden Blood", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-24", title: "Wandee Good Day", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-25", title: "Don't Say No", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" },
    { id: "bl-26", title: "Reset", category: "BL", status: "Watched", rating: null, notes: "", coverImage: null, dateAdded: "2026-05-30" }
  ],
  anime: [
    { id: "seed-a1", title: "Your Name", category: "Movies", status: "Watched", rating: 5, notes: "the ending destroyed me", coverImage: null, dateAdded: "2026-05-27" },
    { id: "seed-a2", title: "Demon Slayer", category: "Series", status: "Watching", rating: null, notes: "tanjiro is so pure", coverImage: null, dateAdded: "2026-05-28" },
    { id: "seed-a3", title: "A Silent Voice", category: "Movies", status: "To Watch", rating: null, notes: "need to watch this soon", coverImage: null, dateAdded: "2026-05-30" }
  ]
};
