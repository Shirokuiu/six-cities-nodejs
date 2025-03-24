import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import {
  Offer,
  OfferApartmentConvenience,
  OfferApartmentType,
  UserType,
} from '../../types/index.js';

export class TsvFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
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
  }
}
