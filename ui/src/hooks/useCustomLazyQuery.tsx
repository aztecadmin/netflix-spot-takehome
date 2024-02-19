import {
  DocumentNode,
  NetworkStatus,
  OperationVariables,
  TypedDocumentNode,
  useLazyQuery,
} from "@apollo/client";

function useCustomLazyQuery<
  TData = never,
  TVariables extends OperationVariables = OperationVariables
>(query: DocumentNode | TypedDocumentNode<TData, TVariables>) {
  const [runQuery, { data, fetchMore, refetch, networkStatus }] = useLazyQuery(
    query,
    { notifyOnNetworkStatusChange: true }
  );

  const isLoading =
    networkStatus === NetworkStatus.refetch ||
    networkStatus === NetworkStatus.loading ||
    networkStatus === NetworkStatus.setVariables;

  const isLoadingMore = networkStatus === NetworkStatus.fetchMore;

  return {
    runQuery,
    data,
    refetch,
    fetchMore,
    networkStatus,
    isLoading,
    isLoadingMore,
  };
}

export default useCustomLazyQuery;
