// Note: In a future, production grade version of this app,
// "sortOptions" and "filterOptions" could come from a remote
// server resource on first app load and be dynamically built by
// the frontend using a generic template cruncher

export const sortOptions = [
  {
    label: "Rating",
    value: "rating",
  },
  {
    label: "Distance",
    value: "distance",
  },
];

export const filterOptions = [
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
