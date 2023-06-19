import { generateSelectColumn, genereateCreatedColumn } from "@components/widgets/AnyListDataTable/anyColumn";
import type { ColumnDef } from "@tanstack/react-table";

export type FriendsListColumns = {
  id: string;
  token: string;
  name: string;
  link: string;
  desc: string;
  logo: string;
  nickname: string;
  avatar: string;
  email: string;
  status: number;
  auto_check: boolean;
  verify_link: string;
  feed: string;
  feed_type: string;
  created: Date;
  feed_contents: string;
};

export const friendsListColumns: ColumnDef<FriendsListColumns>[] = [
  generateSelectColumn<FriendsListColumns>(),
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Description",
    accessorKey: "desc",
  },
  {
    header: "Link",
    accessorKey: "link",
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => {
      return (
        <a href={`mailto:${row.original.email}`}>
          {row.original.email}
        </a>
      );
    },
  },
  {
    header: "Group",
    accessorKey: "group",
  },
  {
    header: "AutoCheck",
    accessorKey: "auto_check",
    cell: ({ row }) => {
      return (
        <span>
          {row.original.auto_check ? "互链 ✅" : "疑似未互链 ❌"}
        </span>
      );
    }
  },
  genereateCreatedColumn<FriendsListColumns>(),
  
]