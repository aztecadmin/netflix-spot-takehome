import { RESTDataSource, AugmentedRequest } from "@apollo/datasource-rest";
import {
  Shop,
  GetBobaShopQueryResult,
  Coordinates,
  SortField,
} from "../../generated/graphql";
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";

class YelpAPI extends RESTDataSource {
  override baseURL = "https://api.yelp.com/";

  private token: string;

  constructor(options: { token: string; cache: KeyValueCache }) {
    super(options);
    this.token = options.token;
  }

  override willSendRequest(_path: string, request: AugmentedRequest) {
    request.headers["authorization"] = this.token;
  }

  async getBobaShops(
    coordinates: Coordinates,
    sort_by: SortField,
    offset: number
  ): Promise<GetBobaShopQueryResult> {
    let sortQuery = sort_by ? { sort_by } : {};
    let offsetQuery = offset ? { offset: offset.toString() } : {};

    let params = {
      latitude: coordinates.latitude.toString(),
      longitude: coordinates.longitude.toString(),
      ...sortQuery,
      radius: "10000",
      limit: "10",
      term: "boba",
      ...offsetQuery,
    };

    const data = await this.get("v3/businesses/search", { params });

    console.log("data", data);

    return {
      shops: data?.businesses || [],
      total: data?.total,
    };
  }
}

export { YelpAPI };
