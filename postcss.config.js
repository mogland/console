/*
 * @FilePath: /nx-admin/postcss.config.js
 * @author: Wibus
 * @Date: 2022-07-12 16:40:21
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-14 16:30:09
 * Coding With IU
 */
module.exports = {
  plugins: {
    'postcss-import': {},
    // 'postcss-nested': {},
    'tailwindcss/nesting': {},
    'tailwindcss': {},
    'autoprefixer': {},
  },
}