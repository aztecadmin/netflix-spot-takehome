// TODO: act needs to be imported and configured for this environment.
// Tests will complain b/c it's not being used.
// ....ie. import { act } from "react-dom/test-utils";
// Rely on tests as is for now

import { cleanup, render, screen, waitFor } from "@testing-library/react";

import { beforeEach, describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";

import { MockedProvider, MockedResponse } from "@apollo/client/testing";

import FilterableStoreTable from ".";

import { mockBobaShops } from "@/graphql/mocks/bobaShops";
import { GET_BOBA_SHOPS_QUERY } from "@/graphql/queries";

beforeEach(cleanup);

// Mock builder function which crunches
// an array of known custom mock flavors i.e. [WITH_LOCATION_FILTER,WITH_LOACTION_FILTER_AND_SORT,etc...]
const mocks = Object.keys(mockBobaShops).map((mock) => {
  return {
    request: {
      query: GET_BOBA_SHOPS_QUERY,
      // @ts-expect-error We know the key "mock" exists based on how we're defining it in the above map
      variables: mockBobaShops[mock].variables,
    },
    // @ts-expect-error We know the key "mock" exists based on how we're defining it in the above map
    result: mockBobaShops[mock].result,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as ReadonlyArray<MockedResponse<any, any>>;

export default mocks;

function renderWithMockProvider(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mocks: ReadonlyArray<MockedResponse<any, any>>
) {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <FilterableStoreTable />
    </MockedProvider>
  );
}

async function selectNetflixOffice(labelText: string) {
  const campusSelector = screen.getByText(
    "Showing Stores Near 121 Albright Way, Los Gatos, CA 95032",
    {
      selector: "button",
    }
  );
  userEvent.click(campusSelector);
  const option = await screen.findByLabelText(labelText);

  await userEvent.click(option);

  return waitFor(() => {
    expect(option).toBeChecked();
  });
}

describe("Tests for FilterableStoreTable component", async () => {
  test("Selecting a Netflix office should cause data to load", async () => {
    // Note: The FilterableStoreTable automatically selects the first Netflix campus on load
    // So there is no need to mock user selection event of Netflix campus
    // Instead we test to make sure the correct data eventually appears
    // The correct data is determined by and the result of one of the mock queries in our mocks list
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FilterableStoreTable />
      </MockedProvider>
    );

    const sortedByDistanceCard = await screen.findByText(
      "Store Card Sorted by Rating"
    );
    await waitFor(() => {
      expect(sortedByDistanceCard).toBeInTheDocument();
    });
  });

  test("Load More Button should appear for paginated responses", async () => {
    renderWithMockProvider(mocks);
    const loadButton = screen.getByText("Load More", {
      selector: "button",
    });
    await waitFor(() => {
      expect(loadButton).toBeVisible();
    });
  });

  test("Load More Button should not appear if data length is less than total count of Yelp data", async () => {
    renderWithMockProvider(mocks);

    await waitFor(() => {
      selectNetflixOffice("888 Broadway, New York, NY 10003");
    });

    const loadButton = screen.getByText("Load More", {
      selector: "button",
    });

    await waitFor(() => {
      expect(loadButton).not.toBeVisible();
    });
  });

  test("Selecting a sort criteria should update query params and cause refetch", async () => {
    renderWithMockProvider(mocks);
    const sortOptionSelector = screen.getByText("Sorting by Rating", {
      selector: "button",
    });

    await waitFor(() => {
      expect(sortOptionSelector).not.toBeNull();
    });

    if (sortOptionSelector) userEvent.click(sortOptionSelector);

    // TODO: Should rely on pre-defined enums for sort options
    const ratingOption = await screen.findByLabelText("Rating");
    const distanceOption = await screen.findByLabelText("Distance");

    await waitFor(() => {
      expect(ratingOption).toBeInTheDocument();
      expect(distanceOption).toBeInTheDocument();
    });

    userEvent.click(distanceOption);

    await waitFor(() => {
      expect(distanceOption).toBeChecked();
    });

    const distanceBtn = await screen.queryByText("Sorting by Distance", {
      selector: "button",
    });

    await waitFor(() => {
      expect(distanceBtn).toBeInTheDocument();
    });

    const sortedByDistanceCard = await screen.queryByText(
      "Store Card Sorted by Distance"
    );
    await waitFor(() => {
      // This comes from the mock query that consists of a
      expect(sortedByDistanceCard).toBeInTheDocument();
    });
  });

  test("Refetch/Paginate fired and resolves with data when Load More button selected", async () => {
    renderWithMockProvider(mocks);
    const loadMore = screen.queryByText("Load More", {
      selector: "button",
    });

    expect(loadMore).not.toBeNull();

    if (loadMore) userEvent.click(loadMore);

    await waitFor(() => {
      const paginatedShop = screen.getByText("Store Card Paginated");
      expect(paginatedShop).toBeInTheDocument();
    });
  });
});
