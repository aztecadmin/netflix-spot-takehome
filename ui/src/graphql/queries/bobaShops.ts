import { graphql } from "@/__generated__gql__";

export const GET_BOBA_SHOPS_QUERY = graphql(`
  query GetBobaShops(
    $coordinates: Coordinates
    $sort_by: SortField
    $offset: Float
  ) {
    getBobaShops(
      coordinates: $coordinates
      sort_by: $sort_by
      offset: $offset
    ) {
      shops {
        id
        name
        location {
          address
          city
          state
          zip_code
        }
        rating
        distance
      }
      total
    }
  }
`);
