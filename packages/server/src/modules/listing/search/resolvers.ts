import { ResolverMap } from '../../../types/graphql-utils';
import { Listing } from '../../../entity/Listing';
import { getConnection } from 'typeorm';

export const resolvers: ResolverMap = {
  Query: {
    searchListings: async (
      _,
      {
        input: { name, guests, beds, longitude, latitude, minPrice, maxPrice },
        limit,
        offset,
      },
    ) => {
      let listingQB = getConnection()
        .getRepository(Listing)
        .createQueryBuilder('l');
      if (guests) {
        listingQB = listingQB.andWhere('l.guests = :guests', { guests });
      }
      if (beds) {
        listingQB = listingQB.andWhere('l.beds = :beds', { beds });
      }
      if (name) {
        listingQB = listingQB.andWhere('l.name ilike :name', {
          name: `%${name}%`,
        });
      }

      if (minPrice !== null && maxPrice !== null) {
        listingQB = listingQB.andWhere(
          'l.price > :minPrice and l.price < :maxPrice',
          {
            minPrice,
            maxPrice,
          },
        );
      }

      if (longitude && latitude) {
        const distanceRadiusInMeter = 1000;
        listingQB = listingQB.andWhere(
          'earth_box(ll_to_earth(:latitude, :longitude), :distanceRadiusInMeter) @> ll_to_earth(l.latitude, l.longitude)',
          {
            longitude,
            latitude,
            distanceRadiusInMeter,
          },
        );
      }
      return listingQB
        .take(limit)
        .skip(offset)
        .getMany();
    },
  },
};
