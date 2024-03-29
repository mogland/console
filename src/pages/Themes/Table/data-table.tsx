import type { AnyListDataTableProps } from "@components/widgets/AnyListDataTable/table";
import { AnyListDataTable } from "@components/widgets/AnyListDataTable/table";

export function ThemesListDataTable<TData, TValue>({
  columns,
  data,
  header,
}: AnyListDataTableProps<TData, TValue>) {
  return (
    <AnyListDataTable
      columns={columns}
      data={data}
      header={header}
      deletePath="/theme"
    />
  );
}
