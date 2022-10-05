/*
 * @FilePath: /mog-admin/src/theme/index.tsx
 * @author: Wibus
 * @Date: 2022-10-05 15:00:21
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-05 15:25:46
 * Coding With IU
 */
import PropTypes from 'prop-types';
import { useMemo } from 'react';
// @mui
import { CssBaseline, PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider as MUIThemeProvider, StyledEngineProvider } from '@mui/material/styles';
// hooks
import useSettings from '../hooks/useSettings';
//
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const { themeMode, themeDirection } = useSettings();
  const isLight = themeMode === 'light';

  const themeOptions = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight, themeDirection]
  );

  // @ts-ignore
  const theme = createTheme(themeOptions);
  theme.palette.mode = themeMode as PaletteMode;
  theme.typography.overline.textTransform = "uppercase"
  theme.typography.button.textTransform = "capitalize"
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
