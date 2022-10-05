/*
 * @FilePath: /mog-admin/src/theme/overrides/Accordion.tsx
 * @author: Wibus
 * @Date: 2022-10-05 15:09:32
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-05 15:09:36
 * Coding With IU
 */

export default function Accordion(theme) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&.Mui-expanded': {
            boxShadow: theme.customShadows.z8,
            borderRadius: theme.shape.borderRadius,
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
          '&.Mui-disabled': {
            opacity: 1,
            color: theme.palette.action.disabled,
            '& .MuiTypography-root': {
              color: 'inherit',
            },
          },
        },
        expandIconWrapper: {
          color: 'inherit',
        },
      },
    },
  };
}
