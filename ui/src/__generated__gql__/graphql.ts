/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Coordinates = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type GetBobaShopQueryResult = {
  __typename?: 'GetBobaShopQueryResult';
  shops: Array<Maybe<Shop>>;
  total: Scalars['Float']['output'];
};

export type Location = {
  __typename?: 'Location';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  zip_code?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getBobaShops: GetBobaShopQueryResult;
};


export type QueryGetBobaShopsArgs = {
  coordinates?: InputMaybe<Coordinates>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  sort_by?: InputMaybe<SortField>;
};

export type Shop = {
  __typename?: 'Shop';
  distance?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  location: Location;
  name: Scalars['String']['output'];
  rating?: Maybe<Scalars['String']['output']>;
};

export enum SortField {
  Distance = 'distance',
  Rating = 'rating'
}

export type GetBobaShopsQueryVariables = Exact<{
  coordinates?: InputMaybe<Coordinates>;
  sort_by?: InputMaybe<SortField>;
  offset?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetBobaShopsQuery = { __typename?: 'Query', getBobaShops: { __typename?: 'GetBobaShopQueryResult', total: number, shops: Array<{ __typename?: 'Shop', id: string, name: string, rating?: string | null, distance?: number | null, location: { __typename?: 'Location', address?: string | null, city?: string | null, state?: string | null, zip_code?: string | null } } | null> } };


export const GetBobaShopsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBobaShops"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"coordinates"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Coordinates"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort_by"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortField"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBobaShops"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"coordinates"},"value":{"kind":"Variable","name":{"kind":"Name","value":"coordinates"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort_by"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zip_code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"distance"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<GetBobaShopsQuery, GetBobaShopsQueryVariables>;