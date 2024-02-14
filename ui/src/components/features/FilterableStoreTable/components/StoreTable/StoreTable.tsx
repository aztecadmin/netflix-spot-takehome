import StoreRow from "../StoreRow";
import { Shop } from "@/__generated__gql__/graphql";

import "./StoreTable.css";

type StoreTable = {
  stores: Array<Shop>;
  emptyMessage?: string;
  isLoading?: boolean;
};

function StoreTable({ stores, emptyMessage, isLoading }: StoreTable) {
  const rows: Array<JSX.Element> = [];
  stores.forEach((store) => {
    rows.push(<StoreRow key={store.id} store={store} />);
  });
  // console.log({ isLoading, stores });
  if (isLoading) {
    return <h1>Loading ...</h1>;
  }
  if (rows.length > 0) {
    return (
      <div className="store-table" data-testid="store-table">
        {rows}
      </div>
    );
  }
  return <h1>{emptyMessage}</h1>;
}

export default StoreTable;
