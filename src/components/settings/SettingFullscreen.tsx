/*
 * @FilePath: /mog-admin/src/components/settings/SettingFullscreen.tsx
 * @author: Wibus
 * @Date: 2022-10-22 08:32:36
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-22 08:44:22
 * Coding With IU
 */
import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Button } from '@mui/material';
// components
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

export default function SettingFullscreen() {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <Button
      fullWidth
      size="large"
      variant="outlined"
      color={fullscreen ? 'primary' : 'inherit'}
      startIcon={<Iconify icon={fullscreen ? 'ic:round-fullscreen-exit' : 'ic:round-fullscreen'} sx={undefined} />}
      onClick={toggleFullScreen}
      sx={{
        fontSize: 14,
        ...(fullscreen && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        }),
      }}
    >
      {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
    </Button>
  );
}
