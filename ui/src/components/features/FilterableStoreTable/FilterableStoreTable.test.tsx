import {
  cleanup,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import { MockedProvider } from "@apollo/client/testing";

import FilterableStoreTable from ".";

import { GET_BOBA_SHOPS_QUERY } from "@/graphql/queries";
import { bobaShops as mockBobaShops } from "@/graphql/mocks";

// Convenience value to genarate several mocks for our tests using one mock object
const batchedMocks = mockBobaShops.data.getBobaShops.shops.map((shop) => {
  const stub = mockBobaShops.data;
  // This is just making sure that the map returns the correct gql query shape
  // See typings for GET_BOBA_SHOPS_QUERY
  return {
    data: {
      getBobaShops: {
        shops: [shop],
        total: stub.getBobaShops.total,
      },
    },
  };
});

console.log(batchedMocks[0]);
const mocks = [
  {
    request: {
      query: GET_BOBA_SHOPS_QUERY,
      variables: {
        coordinates: {
          latitude: 34.0977378,
          longitude: -118.318907,
        },
        // offset: 1,
        // sort_by: "rating",
      },
    },
    // result: batchedMocks[0],
    result: mockBobaShops,
  },
];

describe("Tests for FilterableStoreTable component", async () => {
  test("", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FilterableStoreTable />
      </MockedProvider>
    );
    screen.debug();
  });
});
