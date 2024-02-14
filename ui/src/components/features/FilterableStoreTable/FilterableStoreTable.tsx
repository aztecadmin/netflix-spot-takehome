import { useCallback, useEffect, useRef, useState } from "react";
import { useLazyQuery, NetworkStatus } from "@apollo/client";

import { GET_BOBA_SHOPS_QUERY } from "@/graphql/queries";
import { Shop } from "@/__generated__gql__/graphql";

import RadioDropdownPicker from "@/components/common/RadioDropdownPicker";
import StoreTable from "./components/StoreTable";

import { filterOptions, sortOptions } from "./configs/filterSortOptions";

import "./FilterableStoreTable.css";

function FilterableStoreTable() {
  const [getBobaShops, { data, fetchMore, refetch, networkStatus }] =
    useLazyQuery(GET_BOBA_SHOPS_QUERY, {
      notifyOnNetworkStatusChange: true,
    });

  const [hasFetched, setHasFetched] = useState(false);
  const hasFetchedRef = useRef(hasFetched);

  const isLoading =
    networkStatus === NetworkStatus.refetch ||
    networkStatus === NetworkStatus.loading ||
    networkStatus === NetworkStatus.setVariables;

  const isLoadingMore = networkStatus === NetworkStatus.fetchMore;

  const shouldShowLoadMoreButton =
    data &&
    data.getBobaShops &&
    data.getBobaShops.total &&
    data.getBobaShops.total > data.getBobaShops.shops.length;

  const returnedEmptyShopsList =
    data && data.getBobaShops && data.getBobaShops.shops.length === 0;

  const emptyMessage =
    !data && !isLoading
      ? "Pick a Netflix Campus"
      : returnedEmptyShopsList
      ? " Oh nooo ... No Boba nearby!"
      : undefined;

  const onLocationSelected = useCallback(
    (v: string) => {
      {
        const filter = filterOptions.find((el) => el.value == v);
        if (filter) {
          if (hasFetchedRef.current) {
            console.log("refetching");
            refetch({
              coordinates: filter.coordinates,
            });
          } else {
            getBobaShops({
              variables: {
                coordinates: filter.coordinates,
              },
            });
            setHasFetched(true);
          }
        }
      }
    },
    [getBobaShops, refetch]
  );

  useEffect(() => {
    hasFetchedRef.current = hasFetched;
  });

  const onSortSelected = useCallback(
    (v: string) => {
      const sort_by = sortOptions.find((el) => el.value == v);
      if (sort_by) {
        refetch({
          // @ts-expect-error TODO: Why is type check failing?
          sort_by: sort_by.value,
          // Possibly related to sort_by being defined as an enum
        });
      }
    },
    [refetch]
  );

  return (
    <div
      className="filter-store-table-wrapper"
      data-testid="filterable-store-table"
    >
      <div className="table-radio-container">
        <RadioDropdownPicker
          options={filterOptions}
          onOptionSelected={onLocationSelected}
          messageWhenUnselected="Choose Netflix Campus"
          messageWhenSelected="Showing Stores Near"
        />
        <RadioDropdownPicker
          options={sortOptions}
          onOptionSelected={onSortSelected}
          messageWhenUnselected="Choose Sort Option"
          messageWhenSelected="Sorting by"
          disabled={!hasFetchedRef.current}
        />
      </div>
      <div className="store-table-wrapper">
        <StoreTable
          data-testid="store-table"
          emptyMessage={emptyMessage}
          isLoading={isLoading}
          stores={(data?.getBobaShops?.shops as Shop[]) || []}
        />

        <button
          style={{ display: shouldShowLoadMoreButton ? "initial" : "none" }}
          disabled={isLoadingMore}
          // TODO: Put onClick in a callback
          onClick={() => {
            fetchMore({
              variables: {
                offset: data!.getBobaShops!.shops!.length,
              },
              // This is our pagination logic
              // Also needs debouncing logic
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return {
                  ...fetchMoreResult,
                  getBobaShops: {
                    ...fetchMoreResult.getBobaShops,
                    shops: [
                      ...prev.getBobaShops.shops,
                      ...fetchMoreResult.getBobaShops.shops,
                    ],
                  },
                };
              },
            });
          }}
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default FilterableStoreTable;
