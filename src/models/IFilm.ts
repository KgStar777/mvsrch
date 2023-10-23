type DifferentApiVersionType = string[] | Array<{ name: string }>;
type UrlDifferentType = {
  url: string,
  previewUrl: string
} | string;

export interface IWatchabilityItem {
  logo:{
    url: string;
  },
  name: string;
  url: string;
}

export interface ITrailerItem {
  name: string;
  site: string;
  type: string;
  url: string;
}

export interface IPersonItemList {
  description: string;
  enName: string;
  enProfession: string;
  id: number;
  name: string;
  photo: string;
  profession: string;
}

export interface ISimularMovie {
  id: string;
  name: string;
  enName: string;
  alternativeName: string;
  poster: UrlDifferentType;
  type: string;
}

export interface IFilm {
  id: string;
  name: string;
  year: number;
  type: string;
  logo: string;
  description: string;
  rating: {
    filmCritics: string,
    imdb: string,
    kp: string
  } | number;
  names: Array<{
    name: string,
    language: string,
    type: string,
  }>,
  persons: IPersonItemList[];
  backdrop: UrlDifferentType;
  poster: UrlDifferentType;
  genres: DifferentApiVersionType;
  countries: DifferentApiVersionType;
  similarMovies: ISimularMovie[];
  videos: {
    trailers: ITrailerItem[];
  }
  watchability: {
    items: IWatchabilityItem[];
  },
}
