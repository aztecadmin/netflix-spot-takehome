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
  const campusSelector = screen.getByText("Choose Netflix Campus", {
    selector: "button",
  });
  userEvent.click(campusSelector);
  const option = await screen.findByLabelText(labelText);

  await userEvent.click(option);
  expect(option).toBeChecked();
}

// We could create a mock builder function which crunches
// an array of known custom mock flavors i.e. [WITH_LOCATION_FILTER,WITH_LOACTION_FILTER_AND_SORT,etc...]
const mocks = [
  {
    request: {
      query: GET_BOBA_SHOPS_QUERY,
      variables: mockBobaShops.WITH_LOCATION_FILTER.variables,
    },
    result: mockBobaShops.WITH_LOCATION_FILTER.result,
  },
  {
    request: {
      query: GET_BOBA_SHOPS_QUERY,
      variables:
        mockBobaShops.WITH_LOACTION_FILTER_AND_SORT_BY_RATING.variables,
    },
    result: mockBobaShops.WITH_LOACTION_FILTER_AND_SORT_BY_RATING.result,
  },
  {
    request: {
      query: GET_BOBA_SHOPS_QUERY,
      variables:
        mockBobaShops.WITH_LOACTION_FILTER_AND_EMPTY_DATA_LIST.variables,
    },
    result: mockBobaShops.WITH_LOACTION_FILTER_AND_EMPTY_DATA_LIST.result,
  },
  {
    request: {
      query: GET_BOBA_SHOPS_QUERY,
      variables: mockBobaShops.PAGINATE_WITH_LOCATION_FILTER.variables,
    },
    result: mockBobaShops.PAGINATE_WITH_LOCATION_FILTER.result,
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
] as ReadonlyArray<MockedResponse<any, any>>;

describe("Tests for FilterableStoreTable component", async () => {
  test("No Apollo query should have been called", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FilterableStoreTable />
      </MockedProvider>
    );
    const tableEl = screen.getByTestId("filterable-store-table");
    expect(tableEl.textContent).toContain("Choose Netflix Campus");
  });

  test("Selecting a Netflix office should cause data to load", async () => {
    renderWithMockProvider(mocks);
    await selectNetflixOffice("121 Albright Way, Los Gatos, CA 95032");
    await waitFor(() => {
      screen.getByText("Shoogar Tea Shoppe");
    });
  });

  test("Load More Button should appear for paginated responses", async () => {
    renderWithMockProvider(mocks);
    await selectNetflixOffice("121 Albright Way, Los Gatos, CA 95032");

    await waitFor(() => {
      const item = screen.queryByText("Load More");
      expect(item).toBeVisible();
    });
  });

  test("Load More Button should not appear if data length is less than total count of Yelp data", async () => {
    renderWithMockProvider(mocks);
    await selectNetflixOffice("888 Broadway, New York, NY 10003");
    await waitFor(
      () => {
        const loadButton = screen.getByText("Load More", {
          selector: "button",
        });

        expect(loadButton).not.toBeVisible();
      },
      { timeout: 3000 }
    );
  });

  test("Selecting a sort criteria should update query params and cause refetch", async () => {
    renderWithMockProvider(mocks);
    selectNetflixOffice("121 Albright Way, Los Gatos, CA 95032");

    await waitFor(() => {
      screen.getByText("Shoogar Tea Shoppe");
    });

    const sortOptionSelector = screen.getByText("Choose Sort Option", {
      selector: "button",
    });
    userEvent.click(sortOptionSelector);
    // TODO: Should rely on pre-defined enums for sort options
    const ratingOption = await screen.findByLabelText("Rating");
    const distanceOption = await screen.findByLabelText("Distance");

    expect(ratingOption).toBeInTheDocument();
    expect(distanceOption).toBeInTheDocument();

    userEvent.click(ratingOption);

    await waitFor(() => {
      // This comes from the mock query that consists of a
      // "sort_by" variable equal to "rating" in bobShop.ts
      screen.getByText("Sorted by Rating");
    });
  });

  test("Refetch/Paginate fired when Load More button selected", async () => {
    renderWithMockProvider(mocks);
    await selectNetflixOffice("121 Albright Way, Los Gatos, CA 95032");

    const loadMore = screen.getByText("Load More", {
      selector: "button",
    });

    userEvent.click(loadMore);

    await waitFor(() => {
      const item = screen.queryByText("Load More");
      expect(item).toBeVisible();
    });

    await waitFor(() => {
      const paginatedShop = screen.getByText("Paginated Shop Name");
      expect(paginatedShop).toBeInTheDocument();
    });
  });
});
