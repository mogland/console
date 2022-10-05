/*
 * @FilePath: /mog-admin/src/theme/overrides/Popover.tsx
 * @author: Wibus
 * @Date: 2022-10-05 15:41:32
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-05 15:41:32
 * Coding With IU
 */
// ----------------------------------------------------------------------

export default function Popover(theme) {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.dropdown,
          borderRadius: Number(theme.shape.borderRadius) * 1.5,
        },
      },
    },
  };
}
