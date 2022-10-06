/*
 * @FilePath: /mog-admin/src/layouts/LogoOnlyLayout.tsx
 * @author: Wibus
 * @Date: 2022-10-06 09:35:47
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-06 23:44:04
 * Coding With IU
 */
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
// components
import Logo from '../components/Logo';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  return (
    <>
      <HeaderStyle>
        <Logo />
      </HeaderStyle>
      <Outlet />
    </>
  );
}
