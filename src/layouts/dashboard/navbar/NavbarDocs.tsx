/*
 * @FilePath: /mog-admin/src/layouts/dashboard/navbar/NavbarDocs.tsx
 * @author: Wibus
 * @Date: 2022-10-07 08:51:42
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-07 08:51:42
 * Coding With IU
 */
// @mui
import { Stack, Button, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
import { PATH_DOCS } from '../../../routes/paths';
// assets
// import { DocIllustration } from '../../../assets';

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  const { user } = useAuth();

  return (
    <Stack
      spacing={3}
      sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}
    >
      {/* <DocIllustration sx={{ width: 1 }} /> */}

      <div>
        <Typography gutterBottom variant="subtitle1">
          Hi, {user?.displayName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          遇到问题了吗？
          <br /> 请查看我们的文档。
        </Typography>
      </div>

      <Button href={PATH_DOCS} target="_blank" rel="noopener" variant="contained">
        查看文档
      </Button>
    </Stack>
  );
}
