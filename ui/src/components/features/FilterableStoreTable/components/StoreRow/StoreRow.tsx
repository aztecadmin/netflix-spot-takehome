import { memo } from "react";
import { Shop } from "@/__generated__gql__/graphql";
import "./StoreRow.css";

import { isNumber } from "@/helpers";

export type StoreRowProps = {
  store: Shop;
};

function StoreRow({ store }: StoreRowProps) {
  // console.log("StoreRow rendered");
  return (
    <div className="store-info-card" data-testid="store-info-card">
      <div className="store-name">{store.name}</div>
      <div className="rating-container">
        <div className="rating-header">Rating</div>
        <div className="rating-value">{store.rating}/5</div>
      </div>
      {isNumber(store.distance) && (
        <div className="distance-value">{store.distance?.toFixed(2)} miles</div>
      )}
      <div className="address-container">
        <div className="address-street">{`${store?.location?.address} `}</div>
        <div className="address-details">{`${store?.location?.city}, ${store?.location?.state} ${store?.location?.zip_code}`}</div>
      </div>
    </div>
  );
}

const MemoStoreRow = memo(StoreRow);

export default MemoStoreRow;
