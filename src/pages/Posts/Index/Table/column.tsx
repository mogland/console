import { useNavigate } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Copy, Delete, Edit, MoreHorizontal } from "lucide-react";

import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { toast } from "sonner";
import { apiClient } from "@utils/request";
import { DataTableColumnHeader } from "@components/ui/data-table-column-header";
import { Checkbox } from "@components/ui/checkbox";

export type PostsListColumns = {
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

export const postsListColumns: ColumnDef<PostsListColumns>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
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
      );
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
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    accessorKey: "created",
    cell: ({ row }) => {
      return <div>{new Date(row.original.created).toLocaleString()}</div>;
    },
  },
  {
    header: "Tags",
    accessorKey: "tags",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.tags.map((item) => {
            return <span key={item}>{item}</span>;
          })}
        </div>
      );
    },
  },
  {
    id: "Actions",
    cell({ row }) {
      const post = row.original;
      const navigate = useNavigate();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                navigate(`/write/post?id=${post.id}`);
              }}
            >
              <Edit className="mr-2 h-4 w-4" /> 编辑文章
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.promise(
                  apiClient(`/post/${post.id}`, {
                    method: "DELETE",
                  }),
                  {
                    loading: "正在删除文章...",
                    success: "文章删除成功",
                    error: "文章删除失败",
                  }
                );
              }}
            >
              <Delete className="mr-2 h-4 w-4" />
              删除文章
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(post.title);
              }}
            >
              <Copy className="mr-2 h-4 w-4" />
              复制文章标题
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
