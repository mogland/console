/*
 * @FilePath: /mog-admin/src/theme/overrides/Autocomplete.tsx
 * @author: Wibus
 * @Date: 2022-10-05 15:27:40
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-05 15:27:40
 * Coding With IU
 */

export default function Autocomplete(theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.dropdown,
        },
        listbox: {
          padding: theme.spacing(0, 1),
          '& .MuiAutocomplete-option': {
            padding: theme.spacing(1),
            margin: theme.spacing(1, 0),
            borderRadius: theme.shape.borderRadius,
          },
        },
      },
    },
  };
}
