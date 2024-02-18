import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import ListView from ".";
import StoreCard from "@/components/features/FilterableStoreTable/components/StoreCard";

import { mockBobaShops as mockBobaShopsBody } from "@/graphql/mocks";
import { Shop } from "@/__generated__gql__/graphql";

const mockBobaShops =
  mockBobaShopsBody.WITH_LOCATION_FILTER.result.data.getBobaShops.shops;

const renderStoreCard = (item: Shop) => (
  <StoreCard key={item.id} store={item} />
);

afterEach(cleanup);

describe("Tests for StoreTable component", async () => {
  test("StoreTable renders a list of stores when supplied with stores list", async () => {
    render(
      <ListView
        renderListItem={renderStoreCard}
        isLoading={false}
        data={mockBobaShops}
        emptyMessage="No data found"
      />
    );
    const storeList = screen.getByTestId("list-view");
    mockBobaShops.forEach((store) => {
      expect(storeList.textContent).toContain(store.name);
    });
  });

  test("StoreTable displays Loading state in preference over store list", async () => {
    render(
      <ListView
        renderListItem={renderStoreCard}
        isLoading={true}
        data={mockBobaShops}
        emptyMessage="No data found"
      />
    );
    const loadingText = screen.getByText("Loading ...");
    expect(loadingText).to.exist;
  });

  test("StoreTable displays correct empty message", async () => {
    render(
      <ListView
        renderListItem={renderStoreCard}
        isLoading={false}
        data={[]}
        emptyMessage="No data found"
      />
    );
    const emptyMessage = screen.getByText("No data found");
    expect(emptyMessage).to.exist;
  });
});
