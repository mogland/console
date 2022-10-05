/*
 * @FilePath: /mog-admin/src/theme/overrides/Badge.tsx
 * @author: Wibus
 * @Date: 2022-10-05 15:31:26
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-05 15:31:26
 * Coding With IU
 */
// ----------------------------------------------------------------------

export default function Badge() {
  return {
    MuiBadge: {
      styleOverrides: {
        dot: {
          width: 10,
          height: 10,
          borderRadius: '50%',
        },
      },
    },
  };
}
