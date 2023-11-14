export  type FilmCard = {
  id: string;
  name:  string;
  previewImage:  string;
  previewVideoLink: string;
  genre:  string;
  }
export  type PromoFilm = {
  id: string;
  name: string;
  posterImage: string;
  backgroundImage: string;
  videoLink: string;
  genre: string;
  released: number;
  isFavorite: boolean;
}

export  type FilmComp = {
  id: string;
  name: string;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
  isFavorite: boolean;
}
export type Review = {
  id: string;
  date: string;
  user: string;
  comment: string;
  rating: number;
}
