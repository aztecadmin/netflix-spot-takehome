import { useCallback, useEffect, useState } from "react";

import { GET_BOBA_SHOPS_QUERY } from "@/graphql/queries";
import { Shop, SortField } from "@/__generated__gql__/graphql";

import useCustomLazyQuery from "@/components/common/hooks/useCustomLazyQuery"; //consider re-organizing hooks by domain

import RadioDropdownPicker from "@/components/common/RadioDropdownPicker";
import ListView from "@/components/common/ListView";

import StoreRow from "./components/StoreCard";

import { filterOptions, sortOptions } from "./configs/filterSortOptions";

import "./FilterableStoreTable.css";

function FilterableStoreList() {
  const [hasFetched, setHasFetched] = useState(false);

  const { runQuery, data, refetch, fetchMore, isLoading, isLoadingMore } =
    useCustomLazyQuery(GET_BOBA_SHOPS_QUERY);

  const defaultFilterValue = filterOptions[0].value;
  const defaultSortValue = sortOptions[0].value;

  const shouldShowLoadMoreButton =
    data &&
    data.getBobaShops &&
    data.getBobaShops.total &&
    data.getBobaShops.total > data.getBobaShops.shops.length &&
    !isLoading;

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
        const location = filterOptions.find((el) => el.value == v);
        if (location) {
          if (hasFetched) {
            refetch({
              coordinates: location.coordinates,
            });
          } else {
            runQuery({
              variables: {
                coordinates: location.coordinates,
                sort_by: defaultSortValue as SortField,
              },
            });
            setHasFetched(true);
          }
        }
      }
    },
    [hasFetched, refetch, runQuery, defaultSortValue]
  );

  const onSortSelected = useCallback(
    (v: string) => {
      const sort_by = sortOptions.find((el) => el.value == v);
      if (sort_by) {
        refetch({
          sort_by: sort_by.value as SortField,
        });
      }
    },
    [refetch]
  );

  const paginate = useCallback(() => {
    fetchMore({
      variables: {
        offset: data?.getBobaShops.shops.length || 0,
      },
      // TODO: Add debouncing logic
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
  }, [fetchMore, data]);

  useEffect(() => {
    onLocationSelected(filterOptions[0]?.value);
  }, [onLocationSelected]);

  const renderListItem = (item: Shop) => (
    <StoreRow key={item.id} store={item} />
  );

  return (
    <div
      className="filter-store-table-wrapper"
      data-testid="filterable-store-table"
    >
      <div className="table-radio-container">
        <RadioDropdownPicker
          options={filterOptions}
          defaultValue={defaultFilterValue}
          onOptionSelected={onLocationSelected}
          messageWhenUnselected="Choose Netflix Campus"
          messageWhenSelected="Showing Stores Near"
        />
        <RadioDropdownPicker
          options={sortOptions}
          defaultValue={defaultSortValue}
          onOptionSelected={onSortSelected}
          messageWhenUnselected="Choose Sort Option"
          messageWhenSelected="Sorting by"
          disabled={!hasFetched}
        />
      </div>
      <div className="list-view-wrapper">
        <ListView
          emptyMessage={emptyMessage}
          isLoading={isLoading}
          data={(data?.getBobaShops?.shops as Shop[]) || []}
          renderListItem={renderListItem}
        />

        <button
          // style={{ display: shouldShowLoadMoreButton ? "initial" : "none" }}
          hidden={!shouldShowLoadMoreButton}
          disabled={isLoadingMore}
          onClick={paginate}
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default FilterableStoreList;
