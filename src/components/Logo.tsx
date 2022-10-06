/*
 * @FilePath: /mog-admin/src/components/Logo.tsx
 * @author: Wibus
 * @Date: 2022-10-06 23:43:43
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-06 23:46:38
 * Coding With IU
 */
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <svg width="100%" height="100%" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <linearGradient x1="87.3138212%" y1="-3.64049557%" x2="26.0801443%" y2="88.3185541%" id="linearGradient-1">
            <stop stopColor="#FFFE04" offset="0%"></stop>
            <stop stopColor="#DFDFDF" offset="100%"></stop>
          </linearGradient>
          <linearGradient x1="50%" y1="-5.62161065%" x2="26.4535028%" y2="94.0824558%" id="linearGradient-2">
            <stop stopColor="#F3F3F3" stopOpacity="0.5" offset="0%"></stop>
            <stop stopColor="#B5B5B5" stopOpacity="0.5" offset="100%"></stop>
          </linearGradient>
          <circle id="path-3" cx="335.129032" cy="334.376344" r="156.182796"></circle>
          <filter x="-14.4%" y="-10.6%" width="125.0%" height="125.0%" filterUnits="objectBoundingBox" id="filter-4">
            <feOffset dx="-6" dy="6" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="12" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0.823529412   0 0 0 0 0.823529412   0 0 0 0 0.552941176  0 0 0 0.793760927 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
          </filter>
        </defs>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <rect fill="#F5FAF1" x="124" y="124" width="420" height="420" rx="112"></rect>
          <g>
            <use fill="black" fillOpacity="1" filter="url(#filter-4)" xlinkHref="#path-3"></use>
            <use fill="url(#linearGradient-1)" fillRule="evenodd" xlinkHref="#path-3"></use>
            <use fill="url(#linearGradient-2)" fillRule="evenodd" xlinkHref="#path-3"></use>
          </g>
        </g>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
