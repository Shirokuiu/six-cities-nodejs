export type Author = {
  names: string[];
  emails: string[];
  avatars: string[];
  passwords: string[];
};

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  dates: Date[];
  cities: string[];
  previews: string[];
  photos: string[];
  types: string[];
  facilities: string[];
  authors: Author[];
};
