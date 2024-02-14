import {
  Resolvers,
  Shop,
  GetBobaShopQueryResult,
} from "../generated/graphql.js";
import { YelpAPI } from "./datasources/yelp-api.js";
import { isNumber } from "../helpers/index.js";

export interface ContextValue {
  dataSources: {
    yelpAPI: YelpAPI;
  };
}

export const resolvers: Resolvers<ContextValue> = {
  Query: {
    getBobaShops: async (
      parent,
      args,
      { dataSources }
    ): Promise<GetBobaShopQueryResult> => {
      // console.log({ parent, args, dataSources });
      let data: GetBobaShopQueryResult;
      try {
        console.log({ args });
        data = await dataSources.yelpAPI.getBobaShops(
          args.coordinates,
          args.sort_by,
          args.offset
        );

        // console.log("resolver sees data", data);

        let allData: Array<Shop> = [];

        allData = data.shops?.map((item) => {
          // TODO: ADD more robust type checking
          if (!item.id) {
            return;
          }
          return {
            id: item.id,
            name: item.name,
            rating: item.rating,
            location: {
              address: item.location["address1"],
              city: item.location.city,
              state: item.location.state,
              zip_code: item.location.zip_code,
            },
            distance: isNumber(item.distance) ? item.distance / 10000 : null,
          };
        });

        data = {
          shops: allData,
          total: data.total,
        };
      } catch (e) {
        console.log("error in resolver", e.extensions.response.body.error);
      } finally {
        return data;
      }
    },
  },
};
