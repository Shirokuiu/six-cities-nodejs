import { OfferApartmentConvenience, OfferApartmentType } from 'src/shared/types/offer.js';
import { UserType } from 'src/shared/types/user.js';

export type Author = {
  names: string[];
  emails: string[];
  avatars: string[];
  types: UserType[];
};

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  dates: Date[];
  cities: string[];
  previews: string[];
  photos: string[];
  types: OfferApartmentType[];
  conveniences: OfferApartmentConvenience[];
  author: Author;
};
