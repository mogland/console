/*
 * @FilePath: /mog-admin/src/theme/overrides/LoadingButton.tsx
 * @author: Wibus
 * @Date: 2022-10-05 15:37:27
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-05 15:37:27
 * Coding With IU
 */


export default function LoadingButton() {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-text': {
            '& .MuiLoadingButton-startIconPendingStart': {
              marginLeft: 0,
            },
            '& .MuiLoadingButton-endIconPendingEnd': {
              marginRight: 0,
            },
          },
        },
      },
    },
  };
}
