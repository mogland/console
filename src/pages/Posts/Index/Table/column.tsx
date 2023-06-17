import type { ColumnDef } from "@tanstack/react-table";

import { generatePostsAndPagesActionsColumn, generateSelectColumn, generateTitleColumn, genereateCreatedColumn } from "@components/widgets/AnyListDataTable/anyColumn";

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
  generateSelectColumn<PostsListColumns>(),
  generateTitleColumn<PostsListColumns>({
    clickHref: (id) => `/write/post?id=${id}`,
  }),
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
  genereateCreatedColumn<PostsListColumns>(),
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
  generatePostsAndPagesActionsColumn<PostsListColumns>("post"),
];
