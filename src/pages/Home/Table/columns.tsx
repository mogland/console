import { DataTableColumnHeader } from "@components/ui/data-table-column-header";
import type { ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom";

export type RecentPost = {
  id: string;
  title: string;
  category: {
    id: string;
    name: string;
  }
  count: {
    read: number;
    like: number;
  };
};

export const recentlyPostColumns: ColumnDef<RecentPost>[] = [
  {
    header: "Title",
    accessorKey: "title",
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <a
          href={`/write/post?id=${row.original.id}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/write/post?id=${row.original.id}`);
          }}
        >
          {row.original.title}
        </a>
      )
    },
  },
  {
    header: "Category",
    accessorKey: "category.name",
  },
  {
    header: "Read",
    accessorKey: "count.read",
  },
  {
    header: "Like",
    accessorKey: "count.like",
  },
]
