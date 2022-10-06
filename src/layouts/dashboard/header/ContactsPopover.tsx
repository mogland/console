/*
 * @FilePath: /mog-admin/src/layouts/dashboard/header/ContactsPopover.tsx
 * @author: Wibus
 * @Date: 2022-10-06 17:43:42
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-06 17:59:43
 * Coding With IU
 */
import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Avatar, Typography, ListItemText, ListItemAvatar, MenuItem } from '@mui/material';
// utils
// import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
import BadgeStatus from '../../../components/BadgeStatus';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

// ----------------------------------------------------------------------

export default function ContactsPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <Iconify icon={'eva:people-fill'} width={20} height={20} sx={undefined} />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 320,
          '& .MuiMenuItem-root': {
            px: 1.5,
            height: ITEM_HEIGHT,
            borderRadius: 0.75,
          },
        }} 
        disabledArrow={undefined}
        >
        <Typography variant="h6" sx={{ p: 1.5 }}>
          Contacts <Typography component="span">(_contacts.length)</Typography>
        </Typography>

        <Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}>
          <MenuItem key={1}>
              <ListItemAvatar sx={{ position: 'relative' }}>
                <Avatar src="" />
                <BadgeStatus status="offline" sx={{ position: 'absolute', right: 1, bottom: 1 }} />
              </ListItemAvatar>

              <ListItemText
                primaryTypographyProps={{ typography: 'subtitle2', mb: 0.25 }}
                secondaryTypographyProps={{ typography: 'caption' }}
                primary={"contact.name"}
                secondary={"contact.status === 'offline' && fToNow(contact.lastActivity)"}
              />
            </MenuItem>
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
