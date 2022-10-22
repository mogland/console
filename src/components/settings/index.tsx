/*
 * @FilePath: /mog-admin/src/components/settings/index.tsx
 * @author: Wibus
 * @Date: 2022-10-22 08:32:01
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-22 08:41:34
 * Coding With IU
 */
import PropTypes from 'prop-types';
import { FormControlLabel, Radio } from "@mui/material";

BoxMask.propTypes = {
  value: PropTypes.string,
};

export function BoxMask({ value }) {
  return (
    <FormControlLabel
      label=""
      value={value}
      control={<Radio sx={{ display: 'none' }} />}
      sx={{
        m: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute',
      }}
    />
  );
}
