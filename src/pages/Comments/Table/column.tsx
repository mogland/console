import {
  generateSelectColumn,
  genereateCreatedColumn,
} from "@components/widgets/AnyListDataTable/anyColumn";
import type { ColumnDef } from "@tanstack/react-table";
import { mailAvatar } from "@utils/avatar";

export interface CommentReaction {
  like: number;
  dislike: number;
  smile: number;
  angry: number;
  laugh: number;
  confused: number;
  heart: number;
  haha: number;
  cry: number;
  wow: number;
}

export type CommentsListColumns = {
  id: string;
  created: Date;
  pid: string;
  children: any[];
  text: string;
  author: string;
  email: string;
  url: string;
  status: number;
  comments_index: number;
  key: string;
  origin: any;
  reaction: CommentReaction;
};

export const commentsListColumns: ColumnDef<CommentsListColumns>[] = [
  generateSelectColumn<CommentsListColumns>(),
  {
    header: "Author",
    id: "author",
    cell: ({ row }) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={mailAvatar(row.original.email)}
          alt={row.original.author}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        {row.original.author}
      </div>
    ),
  },
  {
    header: "Content",
    accessorKey: "text",
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => {
      return <a href={`mailto:${row.original.email}`}>{row.original.email}</a>;
    },
  },
  {
    header: "Origin",
    accessorKey: "origin",
    cell: ({ row }) => {
      return <span>{row.original.origin?.title}</span>;
    },
  },
  genereateCreatedColumn<CommentsListColumns>(),
];
