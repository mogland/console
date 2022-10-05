/*
 * @FilePath: /mog-admin/src/theme/overrides/Avatar.tsx
 * @author: Wibus
 * @Date: 2022-10-05 15:30:39
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-05 15:30:40
 * Coding With IU
 */
export default function Avatar(theme) {
  return {
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.grey[400],
        },
      },
    },
    MuiAvatarGroup: {
      styleOverrides: {
        avatar: {
          fontSize: 16,
          fontWeight: theme.typography.fontWeightMedium,
          '&:first-of-type': {
            fontSize: 14,
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.lighter,
          },
        },
      },
    },
  };
}
