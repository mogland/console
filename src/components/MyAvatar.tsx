/*
 * @FilePath: /mog-admin/src/components/MyAvatar.tsx
 * @author: Wibus
 * @Date: 2022-10-06 18:09:33
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-06 18:15:06
 * Coding With IU
 */
// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <Avatar
      src={user?.photoURL}
      alt={user?.displayName}
      color={user?.photoURL ? 'default' : createAvatar(user?.displayName).color}
      {...other}
    >
      {createAvatar(user?.displayName).name}
    </Avatar>
  );
}
