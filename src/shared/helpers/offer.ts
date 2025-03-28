import { Offer, OfferApartmentConvenience, OfferApartmentType, UserType } from '../types/index.js';
import { Symbols } from '../constants.js';

export const createOffer = (offerRawData: string): Offer[] =>
  offerRawData
    .split(Symbols.NewLine)
    .filter((row) => row.trim().length > 0)
    .map((line) => line.split(Symbols.Tab))
    .map(
      ([
        title,
        description,
        date,
        city,
        previewImg,
        photos,
        isPremium,
        isFavorite,
        rate,
        type,
        roomCount,
        guestCount,
        cost,
        conveniences,
        authorLastName,
        authorFirstName,
        authorEmail,
        authorAvatar,
        authorType,
        coordinateName,
        coordinateLatitude,
        coordinateLongitude,
      ]) => ({
        title,
        description,
        date,
        city,
        previewImg,
        isPremium: JSON.parse(isPremium) as boolean,
        isFavorite: JSON.parse(isFavorite) as boolean,
        rate: parseInt(rate, 10),
        type: type as OfferApartmentType,
        roomCount: parseInt(roomCount, 10),
        guestCount: parseInt(guestCount, 10),
        cost: parseInt(cost, 10),
        conveniences: conveniences
          .split(';')
          .map((convenience) => convenience) as OfferApartmentConvenience[],
        photos: photos.split(';').map((photo) => photo),
        author: {
          email: authorEmail,
          firstName: authorFirstName,
          lastName: authorLastName,
          avatar: authorAvatar,
          type: authorType as UserType,
        },
        coordinate: {
          name: coordinateName,
          latitude: parseInt(coordinateLatitude, 10),
          longitude: parseInt(coordinateLongitude, 10),
        },
      }),
    );
