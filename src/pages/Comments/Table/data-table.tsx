import type { AnyListDataTableProps } from "@components/widgets/AnyListDataTable/table";
import { AnyListDataTable } from "@components/widgets/AnyListDataTable/table";

export function CommentsTable<TData, TValue>({
  columns,
  data,
  header,
  pagination,
}: AnyListDataTableProps<TData, TValue>) {
  return (
    <AnyListDataTable
      columns={columns}
      data={data}
      header={header}
      pagination={pagination}
      deletePath="/post"
    />
  );
}
