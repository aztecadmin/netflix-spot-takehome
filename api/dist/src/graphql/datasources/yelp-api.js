import { RESTDataSource } from "@apollo/datasource-rest";
class YelpAPI extends RESTDataSource {
    constructor(options) {
        super(options);
        this.baseURL = "https://api.yelp.com/";
        this.token = options.token;
    }
    willSendRequest(_path, request) {
        request.headers["authorization"] = this.token;
    }
    async getBobaShops(coordinates, sort_by, offset) {
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
