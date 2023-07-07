import { DataTableColumnHeader } from "@components/ui/data-table-column-header";
import {
  generateAnyActionsColumn,
  generateSelectColumn,
  generateTitleColumn,
} from "@components/widgets/AnyListDataTable/anyColumn";
import { _private } from "@states/private";
import { ColumnDef } from "@tanstack/react-table";
import { apiClient } from "@utils/request";
import { Asterisk, Delete, Edit, PlayCircle } from "lucide-react";
import { toast } from "sonner";

export const ScheduleType = {
  url: "访问 URL",
  event: "广播事件",
};

export const ScheduleAfter = {
  none: "无",
  store: "存储",
  url: "访问 URL",
};

export interface ScheduleItemProps {
  token: string;
  name: string;
  description: string;
  cron: string;
  next: string;
  type: keyof typeof ScheduleType;
  after: keyof typeof ScheduleAfter;
  error: object[];
  running: boolean;
}

export type ScheduleColumns = ScheduleItemProps;

export const ScheduleColumns: ColumnDef<ScheduleColumns>[] = [
  generateSelectColumn<ScheduleColumns>(),
  generateTitleColumn<ScheduleColumns>({
    key: "name",
    idKey: "token",
    clickHref: (id) => `/schedule/${id}`,
  }),
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="任务描述" />
    ),
    accessorKey: "description",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cron 表达式" />
    ),
    accessorKey: "cron",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="下一次执行" />
    ),
    accessorKey: "next",
    cell: ({ row }) => {
      const { next } = row.original;
      const date = new Date(next);
      return date.toLocaleString();
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="任务状态" />
    ),
    accessorKey: "running",
    cell: ({ row }) => {
      const { running } = row.original;
      return running ? "激活" : "停止";
    },
  },
  generateAnyActionsColumn({
    menus: [
      {
        title: "编辑",
        icon: <Edit className="mr-2 h-4 w-4" />,
        onClick: (row) => {
          _private.showModal = true;
          _private.modalDataId = row.token;
        },
      },
      {
        title: "删除",
        icon: <Delete className="mr-2 h-4 w-4" />,
        onClick: (row) => {
          toast.promise(
            apiClient(`/schedule/${row.token}`, {
              method: "DELETE",
            }),
            {
              loading: "正在删除...",
              success: "删除成功",
              error: "删除失败",
            }
          )
        },
      },
      {
        title: "运行",
        icon: <PlayCircle className="mr-2 h-4 w-4" />,
        onClick: (row) => {
          toast.promise(
            apiClient(`/schedule/${row.token}/run`, {
              method: "POST",
            }),
            {
              loading: "正在运行...",
              success: "运行成功",
              error: "运行失败",
            }
          )
        },
      },
      {
        title: "切换状态",
        icon: <Asterisk className="mr-2 h-4 w-4" />,
        onClick: (row) => {
          toast.promise(
            apiClient(`/schedule/${row.token}/`, {
              method: "PATCH",
            }),
            {
              loading: "正在切换...",
              success: "切换成功",
              error: "切换失败",
            }
          )
        },
      },
      
    ],
  }),
];
