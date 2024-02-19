// TODO: act needs to be imported and configured for this environment.
// Tests will complain b/c it's not being used.
// ....ie. import { act } from "react-dom/test-utils";
// Rely on tests as is for now

import { cleanup, render, screen, waitFor } from "@testing-library/react";

import { beforeEach, describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";

import { MockedProvider, MockedResponse } from "@apollo/client/testing";

import FilterableStoreTable from ".";

import { GET_BOBA_SHOPS_QUERY } from "@/graphql/queries";
import { mockBobaShops } from "@/graphql/mocks";

beforeEach(cleanup);

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

// We could create a mock builder function which crunches
// an array of known custom mock flavors i.e. [WITH_LOCATION_FILTER,WITH_LOACTION_FILTER_AND_SORT,etc...]
const mocks = [
  {
    request: {
      query: GET_BOBA_SHOPS_QUERY,
      variables: mockBobaShops.WITH_SORT_BY_DISTANCE.variables,
    },
    result: mockBobaShops.WITH_SORT_BY_DISTANCE.result,
  },
  {
    request: {
      query: GET_BOBA_SHOPS_QUERY,
      variables: mockBobaShops.WITH_SORT_BY_RATING.variables,
    },
    result: mockBobaShops.WITH_SORT_BY_RATING.result,
  },
  {
    request: {
      query: GET_BOBA_SHOPS_QUERY,
      variables: mockBobaShops.WITH_EMPTY_DATA_LIST.variables,
    },
    result: mockBobaShops.WITH_EMPTY_DATA_LIST.result,
  },
  {
    request: {
      query: GET_BOBA_SHOPS_QUERY,
      variables: mockBobaShops.PAGINATE_WITH_SORT_BY_RATING.variables,
    },
    result: mockBobaShops.PAGINATE_WITH_SORT_BY_RATING.result,
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
] as ReadonlyArray<MockedResponse<any, any>>;

describe("Tests for FilterableStoreTable component", async () => {
  test("Selecting a Netflix office should cause data to load", async () => {
    renderWithMockProvider(mocks);
    await waitFor(() => {
      // TODO: "Sorted by Rating" should be a default (and overrideable) prop passed to FilterablStoreTable
      screen.getByText("Sorted by Rating");
    });
  });

  test("Load More Button should appear for paginated responses", async () => {
    renderWithMockProvider(mocks);
    await waitFor(() => {
      const item = screen.queryByText("Load More");
      const store = screen.queryByText("Sorted by Rating");
      expect(item).toBeVisible();
      expect(store).toBeVisible();
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

    userEvent.click(sortOptionSelector);
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

    const distanceMessage = screen.getByText("Sorting by Distance", {
      selector: "button",
    });

    await waitFor(() => {
      expect(distanceMessage).toBeInTheDocument();
    });

    const sortedByDistanceCard = screen.getByText(
      "Store Card Sorted by Rating"
    );
    await waitFor(() => {
      // This comes from the mock query that consists of a
      expect(sortedByDistanceCard).toBeInTheDocument();
    });
  });

  test("Refetch/Paginate fired and resolves with data when Load More button selected", async () => {
    renderWithMockProvider(mocks);
    const loadMore = screen.getByText("Load More", {
      selector: "button",
    });

    userEvent.click(loadMore);

    await waitFor(() => {
      const paginatedShop = screen.getByText("Paginated Shop Name");
      expect(paginatedShop).toBeInTheDocument();
    });
  });
});
