import { cleanup, render, screen } from "@testing-library/react";

import { afterEach, describe, expect, test } from "vitest";

import StoreTable from "./";

import { bobaShops as mockBobaShopsBody } from "@/graphql/mocks";

const mockBobaShops = mockBobaShopsBody.data.getBobaShops.shops;

afterEach(cleanup);

describe("Tests for StoreTable component", async () => {
  test("StoreTable renders a list of stores when supplied with stores list", async () => {
    render(<StoreTable stores={mockBobaShops} />);

    const storeTable = screen.getByTestId("store-table");

    mockBobaShops.forEach((store) => {
      expect(storeTable.textContent).toContain(store.name);
    });
  });
});
