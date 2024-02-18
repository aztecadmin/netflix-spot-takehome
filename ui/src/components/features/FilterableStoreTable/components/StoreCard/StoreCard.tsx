import { memo } from "react";
import { Shop } from "@/__generated__gql__/graphql";
import "./StoreCard.css";

import { isNumber } from "@/helpers";

export type StoreCardProps = {
  store: Shop;
};

function StoreCard({ store }: StoreCardProps) {
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

const MemoStoreCard = memo(StoreCard);

export default MemoStoreCard;
