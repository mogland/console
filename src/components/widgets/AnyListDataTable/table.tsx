"use client";
import type {
  ColumnDef,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Button } from "@components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@components/ui/dropdown-menu";
import clsx from "clsx";
import { toast } from "sonner";
import { apiClient } from "@utils/request";
import { useNavigate } from "react-router-dom";

export interface AnyListDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  header?: React.ReactNode;
  pagination?: {
    total: number;
    total_page: number;
    current_page: number;
  };
  deletePath?: string;
}

export function AnyListDataTable<TData, TValue>({
  columns,
  data,
  header,
  pagination,
  deletePath,
}: AnyListDataTableProps<TData, TValue>) {
  const navigate = useNavigate();
  const currentPath = window.location.pathname.split("/")[1];
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        {header}

        {table.getFilteredSelectedRowModel().rows.length ? (
          <Button
            variant="outline"
            className={clsx("mr-2")}
            onClick={() => {
              const tasks = Promise.all(
                table.getFilteredSelectedRowModel().rows.map((row) => {
                  return apiClient(`/${deletePath}/${row.id}`, {
                    method: "DELETE",
                  });
                })
              ).then(() => {
                table.resetRowSelection();
                table.resetSorting();
              });
              toast.promise(tasks, {
                loading: "正在删除",
                success: "删除成功",
                error: "删除失败",
              });
            }}
          >
            删除
          </Button>
        ) : null}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">展示列</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  无内容
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination ? (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigate(`/${currentPath}?page=${pagination.current_page - 1}`);
            }}
            disabled={
              !(
                pagination.current_page <= pagination.total_page &&
                pagination.current_page > 1
              )
            }
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigate(`/${currentPath}?page=${pagination.current_page + 1}`);
            }}
            disabled={
              !(pagination.current_page < pagination.total_page) ||
              pagination.total_page === 1
            }
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
}
