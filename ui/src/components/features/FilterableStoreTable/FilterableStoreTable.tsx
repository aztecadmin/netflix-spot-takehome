// import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_BOBA_SHOPS_QUERY } from "@/graphql/queries";
import { Shop } from "@/__generated__gql__/graphql";

import RadioDropdownPicker from "@/components/common/RadioDropdownPicker";
import StoreTable from "./components/StoreTable";

import "./FilterableStoreTable.css";
import { useCallback, useEffect, useRef, useState } from "react";

// Note: In a future, production grade version of this app,
// "sortOptions" and "filterOptions" could come from a remote
// server call on first app load and be dynamically built by
// the frontend using some generic template cruncher

const sortOptions = [
  {
    label: "Rating",
    value: "rating",
  },
  {
    label: "Distance",
    value: "distance",
  },
];

const filterOptions = [
  {
    label: "121 Albright Way, Los Gatos, CA 95032",
    value: "option-1",
    default: true,
    coordinates: {
      latitude: 37.2570376,
      longitude: -121.9665658,
    },
  },
  {
    label: "888 Broadway, New York, NY 10003",
    value: "option-2",
    coordinates: {
      latitude: 40.7382917,
      longitude: 73.9922788,
    },
  },
  {
    label: "5808 Sunset Blvd, Los Angeles, CA 90028",
    value: "option-3",
    coordinates: {
      latitude: 34.0977378,
      longitude: -118.318907,
    },
  },
];

function FilterableStoreTable() {
  // Shouldn't be hardcoded but leaving for now to focus on testing
  const [getBobaShops, { data, fetchMore, refetch }] =
    useLazyQuery(GET_BOBA_SHOPS_QUERY);

  const [hasFetched, setHasFetched] = useState(false);
  const hasFetchedRef = useRef(hasFetched);

  const shouldShowLoadMoreButton =
    data &&
    data.getBobaShops &&
    data.getBobaShops.total &&
    data.getBobaShops.total > data.getBobaShops.shops.length;

  // This is a part of the dependency array of a useEffect hook
  // in the RadioDropdownPicker (premature optimization)
  const onLocationSelected = useCallback((v: string) => {
    {
      const filter = filterOptions.find((el) => el.value == v);
      if (filter) {
        if (hasFetchedRef.current) {
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
  }, []);

  useEffect(() => {
    hasFetchedRef.current = hasFetched;
  });

  // This is a part of the dependency array of a useEffect hook
  // in the RadioDropdownPicker (premature optimization)
  const onSortSelected = useCallback((v: string) => {
    const sort_by = sortOptions.find((el) => el.value == v);
    if (sort_by) {
      refetch({
        // @ts-expect-error TODO: Why is type check failing?
        sort_by: sort_by.value,
        // Possibly related to sort_by being defined as an enum
      });
    }
  }, []);

  return (
    <div className="filter-store-table-wrapper">
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
        />
      </div>
      <div className="store-table-wrapper">
        <StoreTable stores={(data?.getBobaShops?.shops as Shop[]) || []} />

        <button
          style={{ display: shouldShowLoadMoreButton ? "initial" : "none" }}
          onClick={() => {
            fetchMore({
              variables: {
                offset: data!.getBobaShops!.shops!.length,
              },
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
