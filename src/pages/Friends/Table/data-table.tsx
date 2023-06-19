"use client";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
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
import { Input } from "@components/ui/input";

export interface FriendsListDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  deletePath?: string;
}

export function FriendsListDataTable<TData, TValue>({
  columns,
  data,
  deletePath,
}: FriendsListDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      rowSelection,
      columnVisibility,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4 place-content-between">
        <Input
          placeholder="Filter links..."
          value={(table.getColumn("link")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("link")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div>
          {table.getFilteredSelectedRowModel().rows.length ? (
            <>
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
              <Button
                variant="outline"
                className={clsx("mr-2")}
                onClick={() => {
                  const tasks = Promise.all(
                    table.getFilteredSelectedRowModel().rows.map((row) => {
                      return apiClient(`/friends/status/${row.id}`, {
                        method: "PATCH",
                        body: {
                          status: 0,
                        },
                      });
                    })
                  ).then(() => {
                    table.resetRowSelection();
                    table.resetSorting();
                  });
                  toast.promise(tasks, {
                    loading: "正在提交通过",
                    success: "提交成功",
                    error: "提交失败",
                  });
                }}
              >
                通过友链
              </Button>
              <Button
                variant="outline"
                className={clsx("mr-2")}
                onClick={() => {
                  const tasks = Promise.all(
                    table.getFilteredSelectedRowModel().rows.map((row) => {
                      return apiClient(`/friends/status/${row.id}`, {
                        method: "PATCH",
                        body: {
                          status: 1,
                        },
                      });
                    })
                  ).then(() => {
                    table.resetRowSelection();
                    table.resetSorting();
                  });
                  toast.promise(tasks, {
                    loading: "正在提交拒绝",
                    success: "提交成功",
                    error: "提交失败",
                  });
                }}
              >
                拒绝友链
              </Button>
              <Button
                variant="outline"
                className={clsx("mr-2")}
                onClick={() => {
                  const tasks = Promise.all(
                    table.getFilteredSelectedRowModel().rows.map((row) => {
                      return apiClient(`/friends/${row.id}/check`).then(() => {
                        table.resetRowSelection();
                        table.resetSorting();
                      });
                    })
                  ).then(() => {
                    table.resetRowSelection();
                    table.resetSorting();
                  });
                  toast.promise(tasks, {
                    loading: "正在检查互链",
                    success: "检查成功，请刷新以更新状态",
                    error: "检查失败",
                  });
                }}
              >
                检查互链
              </Button>
            </>
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
                  aria-label={(row.original as any).id}
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
