/*
 * @FilePath: /mog-admin/src/theme/overrides/Breadcrumbs.tsx
 * @author: Wibus
 * @Date: 2022-10-05 15:31:36
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-05 15:31:37
 * Coding With IU
 */
// ----------------------------------------------------------------------

export default function Breadcrumbs(theme) {
  return {
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(2),
        },
      },
    },
  };
}
