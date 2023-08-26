import {
  CategoryManagement,
  Dashboard,
  Editor,
  FolderFocusOne,
  FriendsCircle,
  HomeTwo,
  OpenDoor,
  Schedule,
  Setting,
  Theme,
  Comment,
} from "@icon-park/react";

export const SIDEBAR = [
  [
    {
      title: "仪表盘",
      path: "/dashboard",
      icon: HomeTwo,
    },
  ],
  [
    {
      title: "文章",
      path: "/posts",
      icon: Editor,
      subItems: [
        {
          title: "写文章",
          path: "/write/post",
        },
        {
          title: "朋友动态",
          path: "/posts/friends",
        },
      ],
    },
  ],
  [
    {
      title: "页面",
      path: "/pages",
      icon: OpenDoor,
      subItems: [
        {
          title: "新增页面",
          path: "/write/page",
        },
      ],
    },
  ],
  [
    {
      title: "评论",
      path: "/comments",
      icon: Comment,
    },
    {
      title: "分类标签",
      path: "/categories",
      icon: CategoryManagement,
    },
    {
      title: "朋友们",
      path: "/friends",
      icon: FriendsCircle,
    },
  ],
  [
    {
      title: "主题",
      path: "/themes",
      icon: Theme,
    },
    {
      title: "系统设置",
      path: "/settings",
      icon: Setting,
    },
    {
      title: "文件管理",
      path: "/files",
      icon: FolderFocusOne,
    },
    {
      title: "定时任务",
      path: "/schedule",
      icon: Schedule,
    },
    {
      title: "服务状态",
      path: "/status",
      icon: Dashboard,
    },
  ],
];
