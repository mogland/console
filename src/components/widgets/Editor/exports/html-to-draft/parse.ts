/*
 * @FilePath: /nx-admin/src/components/widgets/Editor/exports/html-to-draft/parse.ts
 * @author: Wibus
 * @Date: 2022-07-23 19:45:53
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-23 19:51:09
 * Coding With IU
 */
const fallback = (html: string) => {
  const doc = document.implementation.createHTMLDocument('');
  doc.documentElement.innerHTML = html as any;
  return doc;
};

export default function parseHTML(html: string): Document | HTMLElement {
  let doc: Document;
  if (typeof DOMParser !== 'undefined') {
    const parser = new DOMParser();
    doc = parser.parseFromString(html, 'text/html');
    if (doc === null || doc.body === null) {
      doc = fallback(html);
    }
  } else {
    doc = fallback(html);
  }
  return doc.body;
}
