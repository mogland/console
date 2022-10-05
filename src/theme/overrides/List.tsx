/*
 * @FilePath: /mog-admin/src/theme/overrides/List.tsx
 * @author: Wibus
 * @Date: 2022-10-05 15:37:17
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-05 15:37:17
 * Coding With IU
 */


export default function List(theme) {
  return {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
        },
      },
    },
    MuiListItemAvatar: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: theme.spacing(2),
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0,
        },
        multiline: {
          marginTop: 0,
          marginBottom: 0,
        },
      },
    },
  };
}
