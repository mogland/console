/*
 * @FilePath: /mog-admin/src/theme/overrides/Menu.tsx
 * @author: Wibus
 * @Date: 2022-10-05 15:37:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-05 15:37:42
 * Coding With IU
 */


export default function Menu(theme) {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
      },
    },
  };
}
