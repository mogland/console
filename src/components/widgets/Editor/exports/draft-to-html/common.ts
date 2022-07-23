/*
 * @FilePath: /nx-admin/src/components/widgets/Editor/exports/draft-to-html/common.ts
 * @author: Wibus
 * @Date: 2022-07-23 16:09:00
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-23 16:09:01
 * Coding With IU
 */

export function forListEach(obj, callback) {
  if (obj) {
    for (const key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        callback(key, obj[key]);
      }
    }
  }
}

export function isEmptyString(str) {
  if (
    str === undefined ||
    str === null ||
    str.length === 0 ||
    str.trim().length === 0
  ) {
    return true;
  }
  return false;
}
