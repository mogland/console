import type { ColumnDef } from "@tanstack/react-table";

import {
  generatePostsAndPagesActionsColumn,
  generateSelectColumn,
  generateTitleColumn,
  genereateCreatedColumn,
  genereateModifiedColumn,
} from "@components/widgets/AnyListDataTable/anyColumn";
import { DataTableColumnHeader } from "@components/ui/data-table-column-header";

export type PagesListColumns = {
  id: string;
  title: string;
  category: {
    id: string;
    name: string;
  };
  count: {
    read: number;
    like: number;
  };
  created: string;
  tags: string[];
};

export const PagesListColumns: ColumnDef<PagesListColumns>[] = [
  generateSelectColumn<PagesListColumns>(),
  generateTitleColumn<PagesListColumns>({
    clickHref: (id) => `/write/page?id=${id}`,
  }),
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SubTitle" />
    ),
    accessorKey: "subtitle",
  },
  genereateCreatedColumn<PagesListColumns>(),
  genereateModifiedColumn<PagesListColumns>(),
  generatePostsAndPagesActionsColumn<PagesListColumns>("post"),
];
