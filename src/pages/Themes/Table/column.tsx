import { Button } from "@components/ui/button";
import { generateSelectColumn } from "@components/widgets/AnyListDataTable/anyColumn";
import { _private } from "@states/private";
import type { ColumnDef } from "@tanstack/react-table";
import { apiClient } from "@utils/request";
import { toast } from "sonner";

export type ThemesListColumns = {
  id: string;
  name: string;
  path: string;
  version: string;
  config: string;
  package: string;
  active: boolean;
};

export const ThemesListColumns: ColumnDef<ThemesListColumns>[] = [
  generateSelectColumn<ThemesListColumns>(),
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Description",
    cell: ({ row }) => {
      const _package = JSON.parse(row.original.package);
      return <span>{_package.description}</span>;
    },
  },
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Version",
    accessorKey: "version",
  },
  {
    header: "Author",
    cell: ({ row }) => {
      const _package = JSON.parse(row.original.package);
      return <span>@{_package.author}</span>;
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div>
          <Button
            size={"sm"}
            variant={"outline"}
            disabled={row.original.active}
            style={{ marginRight: "5px" }}
            onClick={() => {
              const handler = apiClient(`/themes/${row.original.id}`, {
                method: "PATCH",
                query: {
                  id: row.original.id,
                },
              }).then(() => {
                row.original.active = true;
                _private.refreshData = true;
              });

              toast.promise(handler, {
                loading: "正在启动主题",
                success: "主题启动成功",
                error: "主题启动失败",
              });
            }}
          >
            {row.original.active ? "已启动" : "启动"}
          </Button>

          <Button
            size={"sm"}
            style={{ marginRight: "5px" }}
            variant={"outline"}
            onClick={() => {
              _private.showModal = true;
              _private.modalDataId = row.original.id;
            }}
          >
            配置项
          </Button>

          <Button
            size={"sm"}
            variant={"outline"}
            disabled={row.original.active}
            style={{ marginRight: "5px" }}
            onClick={() => {
              const handler = apiClient(`/themes/${row.original.id}`, {
                method: "DELETE",
                query: {
                  id: row.original.id,
                },
              }).then(() => {
                _private.refreshData = true;
              });

              toast.promise(handler, {
                loading: "正在卸载主题",
                success: "主题卸载成功",
                error: "主题卸载失败",
              });
            }}
          >
            {row.original.active ? "禁止卸载" : "卸载"}
          </Button>
        </div>
      );
    },
  },
];
