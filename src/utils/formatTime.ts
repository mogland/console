/*
 * @FilePath: /mog-admin/src/utils/formatTime.ts
 * @author: Wibus
 * @Date: 2022-10-07 08:37:17
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-07 08:37:18
 * Coding With IU
 */
import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date: string | number | Date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date: string | number | Date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fTimestamp(date: string | number | Date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date: string | number | Date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date: string | number | Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}
