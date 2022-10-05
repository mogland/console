/*
 * @FilePath: /mog-admin/src/theme/overrides/Paper.tsx
 * @author: Wibus
 * @Date: 2022-10-05 15:41:25
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-05 15:41:26
 * Coding With IU
 */


export default function Paper(theme) {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },

      variants: [
        {
          props: { variant: 'outlined' },
          style: { borderColor: theme.palette.grey[500_12] },
        },
      ],

      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  };
}
