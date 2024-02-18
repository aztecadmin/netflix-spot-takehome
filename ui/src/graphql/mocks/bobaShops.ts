export const mockBobaShops = {
  // Value we use to test data that has a response
  // and only has location filter
  WITH_LOCATION_FILTER: {
    result: {
      data: {
        getBobaShops: {
          shops: [
            {
              id: "4cXo8Jjv_hlO0ZPZc_RxAA",
              name: "Shoogar Tea Shoppe",
              location: {
                address: "268 S Rampart Blvd",
                city: "Los Angeles",
                state: "CA",
                zip_code: "90057",
              },
              rating: "4.7",
              distance: 0.5109359364980661,
            },
            {
              id: "L0QlctHdsHBxPTpKevV0PA",
              name: "Cafe De Mama",
              location: {
                address: "1102 S Western Ave",
                city: "Los Angeles",
                state: "CA",
                zip_code: "90006",
              },
              rating: "4.6",
              distance: 0.5318252296777155,
            },
          ],
          total: 824,
        },
      },
    },
    variables: {
      coordinates: {
        latitude: 37.2570376, // 121 Albright
        longitude: -121.9665658,
      },
    },
  },
  // Value we use to test data that has a response
  // and has location filter AND sort_by rating filter
  WITH_LOACTION_FILTER_AND_SORT_BY_RATING: {
    result: {
      data: {
        getBobaShops: {
          shops: [
            {
              id: "14MDdNv1L62t60IUQw-8GA",
              name: "Sorted by Rating",
              location: {
                address: "5825 Franklin Ave",
                city: "Los Angeles",
                state: "CA",
                zip_code: "90028",
              },
              rating: "4.8",
              distance: 0.08986167968287338,
            },
          ],
          total: 824,
        },
      },
    },
    variables: {
      coordinates: {
        latitude: 37.2570376, // 121 Albright
        longitude: -121.9665658,
      },
      sort_by: "rating",
    },
  },
  // Value we use to test data that is an empty list
  // and has location filter
  WITH_LOACTION_FILTER_AND_EMPTY_DATA_LIST: {
    result: {
      data: {
        getBobaShops: {
          shops: [],
          total: 0,
        },
      },
    },
    variables: {
      coordinates: {
        // Note: We can select any lat/lon value that is unique to this
        // object and exists in the UIs
        latitude: 40.7382917,
        longitude: 73.9922788,
      },
    },
  },

  PAGINATE_WITH_LOCATION_FILTER: {
    result: {
      data: {
        getBobaShops: {
          shops: [
            {
              id: "paginatedResponseID",
              name: "Paginated Shop Name",
              location: {
                address: "Paginated Ave",
                city: "Los Angeles",
                state: "CA",
                zip_code: "90006",
              },
              rating: "4.8",
              distance: 0.5318252296777155,
            },
          ],
          total: 824,
        },
      },
    },
    variables: {
      coordinates: {
        latitude: 37.2570376, // 121 Albright
        longitude: -121.9665658,
      },
      offset: 1,
      sort_by: "rating",
    },
  },
};
