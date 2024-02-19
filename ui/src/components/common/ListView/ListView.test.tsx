import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import ListView from ".";
import StoreCard from "@/components/features/FilterableStoreTable/components/StoreCard";

import { mockBobaShops as mockBobaShopsBody } from "@/graphql/mocks";
import { Shop } from "@/__generated__gql__/graphql";

const mockBobaShops =
  mockBobaShopsBody.WITH_SORT_BY_RATING.result.data.getBobaShops.shops;

const renderStoreCard = (item: Shop) => (
  <StoreCard key={item.id} store={item} />
);

afterEach(cleanup);

describe("Tests for ListView component", async () => {
  test("ListView renders a list of items when supplied with item list", async () => {
    render(
      <ListView
        renderListItem={renderStoreCard}
        isLoading={false}
        data={mockBobaShops}
        emptyMessage="No data found"
      />
    );
    const itemList = screen.getByTestId("list-view");
    mockBobaShops.forEach((store) => {
      expect(itemList.textContent).toContain(store.name);
    });
  });

  test("ListView displays Loading state in preference over items", async () => {
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

  test("ListView displays correct empty message", async () => {
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
