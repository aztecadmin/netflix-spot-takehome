import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import StoreTable from "./";

import { mockBobaShops as mockBobaShopsBody } from "@/graphql/mocks";

const mockBobaShops =
  mockBobaShopsBody.WITH_LOCATION_FILTER.result.data.getBobaShops.shops;

afterEach(cleanup);

describe("Tests for StoreTable component", async () => {
  test("StoreTable renders a list of stores when supplied with stores list", async () => {
    render(<StoreTable stores={mockBobaShops} isLoading={false} />);
    const storeTable = screen.getByTestId("store-table");
    mockBobaShops.forEach((store) => {
      expect(storeTable.textContent).toContain(store.name);
    });
  });

  test("StoreTable displays Loading state in preference over store list", async () => {
    render(<StoreTable stores={mockBobaShops} isLoading={true} />);
    const loadingText = screen.getByText("Loading ...");
    expect(loadingText).to.exist;
  });

  test("StoreTable displays correct empty message", async () => {
    render(
      <StoreTable stores={[]} isLoading={false} emptyMessage="No data found" />
    );
    const emptyMessage = screen.getByText("No data found");
    expect(emptyMessage).to.exist;
  });
});
