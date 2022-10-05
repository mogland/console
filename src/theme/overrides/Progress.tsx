/*
 * @FilePath: /mog-admin/src/theme/overrides/Progress.tsx
 * @author: Wibus
 * @Date: 2022-10-05 15:41:38
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-05 15:41:38
 * Coding With IU
 */
// ----------------------------------------------------------------------

export default function Progress(theme) {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          overflow: 'hidden',
        },
        bar: {
          borderRadius: 4,
        },
        colorPrimary: {
          backgroundColor: theme.palette.primary[isLight ? 'lighter' : 'darker'],
        },
        buffer: {
          backgroundColor: 'transparent',
        },
      },
    },
  };
}
