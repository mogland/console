/*
 * @FilePath: /mog-admin/src/components/Avatar.tsx
 * @author: Wibus
 * @Date: 2022-10-06 18:09:47
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-06 18:15:05
 * Coding With IU
 */
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar as MUIAvatar } from '@mui/material';

// ----------------------------------------------------------------------

const Avatar = forwardRef((data, ref) => {
  const { color = 'default', children, sx, ...other } = data as any;
  const theme = useTheme();

  if (color === 'default') {
    return (
      <MUIAvatar sx={sx} {...other} ref={ref}>
        {children}
      </MUIAvatar>
    );
  }

  return (
    <MUIAvatar
      ref={ref}
      sx={{
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette[color].contrastText,
        backgroundColor: theme.palette[color].main,
        ...sx,
      }}
      {...other}
    >
      {children}
    </MUIAvatar>
  );
}) as React.FC<any>;

Avatar.propTypes = {
  // @ts-ignore
  children: PropTypes.node,
  sx: PropTypes.object,
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error']),
};

export default Avatar;
