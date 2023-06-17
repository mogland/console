import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { DataTableColumnHeader } from "@components/ui/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { apiClient } from "@utils/request";
import { MoreHorizontal, Edit, Delete, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function generateSelectColumn<T>(): ColumnDef<T> {
  return {
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
  };
}

/**
 * @description Generate a DataTable column definition for a title column.
 * @param {object} props - The props object.
 * @param {function} props.clickHref - The click href. (id: string) => string
 * @returns {object} A DataTable column definition.
 */
export function generateTitleColumn<T>(props: {
  clickHref: (id: string) => string;
}): ColumnDef<
  T & {
    id: string;
    title: string;
  }
> {
  return {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    accessorKey: "title",
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <a
          href={`${props.clickHref(row.original.id)}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(`${props.clickHref(row.original.id)}`);
          }}
        >
          {row.original.title}
        </a>
      );
    },
  };
}

export function genereateCreatedColumn<T>(): ColumnDef<T> {
  return {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    accessorKey: "created",
    cell: ({ row }) => {
      return (
        <div>{new Date((row.original as any).created).toLocaleString()}</div>
      );
    },
  };
}

export function genereateModifiedColumn<T>(): ColumnDef<T> {
  return {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modified" />
    ),
    accessorKey: "mofified",
    cell: ({ row }) => {
      return (
        <div>{new Date((row.original as any).modified).toLocaleString()}</div>
      );
    },
  };
}

export function generatePostsAndPagesActionsColumn<T>(
  type: "post" | "page"
): ColumnDef<T & {
  id: string;
  title: string;
}> {
  return {
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
                navigate(`/write/${type}?id=${post.id}`);
              }}
            >
              <Edit className="mr-2 h-4 w-4" /> 编辑
              {type === "post" ? "文章" : "页面"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.promise(
                  apiClient(`/${type}/${post.id}`, {
                    method: "DELETE",
                  }),
                  {
                    loading: `正在删除${type === "post" ? "文章" : "页面"}...`,
                    success: `已删除${type === "post" ? "文章" : "页面"}`,
                    error: `删除${type === "post" ? "文章" : "页面"}失败`,
                  }
                );
              }}
            >
              <Delete className="mr-2 h-4 w-4" />
              删除{type === "post" ? "文章" : "页面"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(post.title);
                toast.success("已复制到剪贴板");
              }}
            >
              <Copy className="mr-2 h-4 w-4" />
              复制{type === "post" ? "文章" : "页面"}标题
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };
}
