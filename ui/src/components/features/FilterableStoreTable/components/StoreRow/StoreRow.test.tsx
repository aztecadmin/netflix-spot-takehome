import { cleanup, render, screen } from "@testing-library/react";

import { afterEach, describe, expect, test } from "vitest";

import StoreRow from "./";

import { mockBobaShops as mockBobaShopsBody } from "@/graphql/mocks";

const mockBobaShops =
  mockBobaShopsBody.WITH_LOCATION_FILTER.result.data.getBobaShops.shops;

afterEach(cleanup);

describe("Tests for StoreRow component", async () => {
  const mockShop = mockBobaShops[0];

  test("StoreRow component renders correct content", async () => {
    render(
      <StoreRow
        store={{
          ...mockBobaShops[0],
        }}
      />
    );

    const storeInfoCard = screen.getByTestId("store-info-card");

    expect(storeInfoCard.textContent).toContain(mockShop.name);
    expect(storeInfoCard.textContent).toContain("Rating");
    expect(storeInfoCard.textContent).toContain(`${mockShop.rating}/5`);
    expect(storeInfoCard.textContent).toContain(
      `${mockShop.distance.toFixed(2)} miles`
    );
    expect(storeInfoCard.textContent).toContain(mockShop.location.address);
    // screen.debug();
  });
});
