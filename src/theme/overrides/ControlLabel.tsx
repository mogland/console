/*
 * @FilePath: /mog-admin/src/theme/overrides/ControlLabel.tsx
 * @author: Wibus
 * @Date: 2022-10-05 15:36:13
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-05 15:36:14
 * Coding With IU
 */


export default function ControlLabel(theme) {
  return {
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          ...theme.typography.body2,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: theme.spacing(1),
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.disabled,
        },
      },
    },
  };
}
