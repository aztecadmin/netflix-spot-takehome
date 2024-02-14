import StoreRow from "../StoreRow";
import { Shop } from "@/__generated__gql__/graphql";

import "./StoreTable.css";

type StoreTable = {
  stores: Array<Shop>;
};

function StoreTable({ stores }: StoreTable) {
  // Show loading state
  const rows: Array<JSX.Element> = [];
  stores.forEach((store) => {
    rows.push(<StoreRow key={store.id} store={store} />);
  });
  return (
    <div className="store-table" data-testid="store-table">
      {rows}
    </div>
  );
}

export default StoreTable;
