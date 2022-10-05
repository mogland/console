/*
 * @FilePath: /mog-admin/src/theme/overrides/Fab.tsx
 * @author: Wibus
 * @Date: 2022-10-05 15:36:56
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-05 15:36:56
 * Coding With IU
 */


export default function Fab(theme) {
  return {
    MuiFab: {
      defaultProps: {
        color: 'primary',
      },

      styleOverrides: {
        root: {
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: theme.palette.grey[400],
          },
        },
        primary: {
          boxShadow: theme.customShadows.primary,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        },
        secondary: {
          boxShadow: theme.customShadows.secondary,
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
          },
        },
        extended: {
          '& svg': {
            marginRight: theme.spacing(1),
          },
        },
      },
    },
  };
}
