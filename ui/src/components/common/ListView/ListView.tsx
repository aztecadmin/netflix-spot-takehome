import "./ListView.css";

type ListData = {
  id: string;
};

type RenderListItem<T extends ListData> = (item: T) => React.ReactNode;

type ListViewProps<T extends ListData> = {
  data: Array<T>;
  emptyMessage?: string;
  isLoading?: boolean;
  renderListItem: RenderListItem<T>;
};

function ListView<T extends ListData>({
  data,
  emptyMessage,
  isLoading,
  renderListItem,
}: ListViewProps<T>) {
  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (data.length === 0) {
    return <h1>{emptyMessage}</h1>;
  }

  return (
    <div className="list-view" data-testid="list-view">
      {data.map((item) => renderListItem(item))}
    </div>
  );
}

export default ListView;
