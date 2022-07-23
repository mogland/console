/*
 * @FilePath: /nx-admin/src/components/widgets/Editor/exports/draft-to-html/index.ts
 * @author: Wibus
 * @Date: 2022-07-23 16:26:55
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-23 16:29:43
 * Coding With IU
 */
import { getBlockMarkup } from './block';
import { getListMarkup, isList } from './list';

export default function draftToHtml(editorContent) {
  const html = new Array<any>();
  if (editorContent) {
    const { blocks, entityMap } = editorContent;
    if (blocks && blocks.length > 0) {
      let listBlocks = new Array<any>();
      blocks.forEach(block => {
        if (isList(block.type)) {
          listBlocks.push(block);
        } else {
          if (listBlocks.length > 0) {
            const listHtml = getListMarkup(listBlocks, entityMap);
            html.push(listHtml);
            listBlocks = [];
          }
          const blockHtml = getBlockMarkup(block, entityMap);
          html.push(blockHtml);
        }
      });
      if (listBlocks.length > 0) {
        const listHtml = getListMarkup(listBlocks, entityMap);
        html.push(listHtml);
        listBlocks = [];
      }
    }
  }
  return html.join('');
}
