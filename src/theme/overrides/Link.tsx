/*
 * @FilePath: /mog-admin/src/theme/overrides/Link.tsx
 * @author: Wibus
 * @Date: 2022-10-05 15:37:10
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-05 15:37:10
 * Coding With IU
 */


export default function Link() {
  return {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
  };
}
