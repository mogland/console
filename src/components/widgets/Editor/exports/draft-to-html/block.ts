/*
 * @FilePath: /nx-admin/src/components/widgets/Editor/exports/draft-to-html/block.ts
 * @author: Wibus
 * @Date: 2022-07-23 16:06:54
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-23 16:29:45
 * Coding With IU
 */
import { BlockType, InlineStyle } from '../../types/editor.interface';

import { forListEach, isEmptyString } from './common';

/**
 * blockTypesMap 对应的是 block 的 type
 */
const blockTypesMapping = {
  unstyled: 'p', // 没有样式的文本
  'header-one': 'h1',
  'header-two': 'h2',
  'header-three': 'h3',
  'header-four': 'h4',
  'header-five': 'h5',
  'header-six': 'h6',
  'unordered-list-item': 'ul', // 有序列表
  'ordered-list-item': 'ol', // 无序列表
  blockquote: 'blockquote', // 引用
  'code-block': 'pre', // 代码
};

/**
 * getBlockTag 得到 block 的标签
 * @param type 样式类型
 * @returns 样式标签
 */
export function getBlockTag(type: string | number): string {
  return type && blockTypesMapping[type]; // 如果 type 不存在，则返回空字符串
}

/**
 * getBlockStyle 得到 block 的样式
 * @param data 数据
 * @returns string
 */
export function getBlockStyle(data: any): string {
  let styles = '';
  forListEach(data, (key: string, value: string) => {
    if (value) {
      styles += `${key}:${value};`; // 拼接样式
    }
  });
  return styles; // 返回样式
}

/**
 * getSections 得到文本的段落
 * @param block block
 */
function getSections(block: BlockType) {
  const sections = new Array(); // 段落
  let lastOffset = 0; // 偏移量
  let sectionRanges = block.entityRanges.map( // 实体范围
    (range: { offset: number; length: number; key: string }) => { // 实体范围
      const { offset, length, key } = range; 
      return {
        offset, // 偏移量
        length, // 长度
        key, // 实体 key
        type: 'ENTITY', // 实体类型
      };
    }
  );
  sectionRanges = sectionRanges.sort((s1, s2) => s1.offset - s2.offset); // 排序
  sectionRanges.forEach(r => { // 遍历实体范围
    if (r.offset > lastOffset) { // 如果偏移量大于上一个偏移量
      sections.push({ // 添加段落
        start: lastOffset, // 开始偏移量
        end: r.offset, // 结束偏移量
      });
    }
    sections.push({ // 添加段落
      start: r.offset, // 开始偏移量
      end: r.offset + r.length, // 结束偏移量
      entityKey: r.key, // 实体 key
      type: r.type, // 实体类型
    });
    lastOffset = r.offset + r.length; // 更新偏移量
  });
  if (lastOffset < block.text.length) { // 如果偏移量小于文本长度
    sections.push({ // 添加段落
      start: lastOffset, // 开始偏移量
      end: block.text.length, // 结束偏移量
    });
  }
  return sections; // 返回段落
}

/**
 * isAtomicEntityBlock 判断是否是实体块
 * @param block block
 */
function isAtomicEntityBlock(block: BlockType) {
  if (
    block.entityRanges.length > 0 && // 如果实体范围大于 0
    (isEmptyString(block.text) || block.type === 'atomic') // 如果文本为空或者类型为 atomic
  ) {
    return true;
  }
  return false;
}

/**
 * getStyleArrayForBlock 得到 block 的样式数组
 * @param block block
 */
function getStyleArrayForBlock(block: BlockType) {
  const { text, inlineStyleRanges } = block; // 文本和样式范围
  const inlineStyles = {
    BOLD: new Array(text.length), // 粗体
    ITALIC: new Array(text.length), // 斜体
    UNDERLINE: new Array(text.length), // 下划线
    STRIKETHROUGH: new Array(text.length), // 删除线
    CODE: new Array(text.length), // 代码
    SUPERSCRIPT: new Array(text.length), // 上标
    SUBSCRIPT: new Array(text.length), // 下标
    COLOR: new Array(text.length), // 颜色
    BGCOLOR: new Array(text.length), // 背景颜色
    FONTSIZE: new Array(text.length), // 字体大小
    FONTFAMILY: new Array(text.length), // 字体类型
    length: text.length, // 长度
  };
  if (inlineStyleRanges && inlineStyleRanges.length > 0) { // 如果样式范围大于 0
    inlineStyleRanges.forEach(range => { // 遍历样式范围
      const { offset } = range; // 偏移量
      const length = offset + range.length; // 长度
      for (let i = offset; i < length; i += 1) { // 遍历偏移量
        if (range.style.indexOf('color-') === 0) { // 如果样式包含 color-
          inlineStyles.COLOR[i] = range.style.substring(6); // 添加颜色
        } else if (range.style.indexOf('bgcolor-') === 0) {
          inlineStyles.BGCOLOR[i] = range.style.substring(8);
        } else if (range.style.indexOf('fontsize-') === 0) {
          inlineStyles.FONTSIZE[i] = range.style.substring(9);
        } else if (range.style.indexOf('fontfamily-') === 0) {
          inlineStyles.FONTFAMILY[i] = range.style.substring(11);
        } else if (inlineStyles[range.style]) { // 如果样式存在
          inlineStyles[range.style][i] = true; // 添加样式
        }
      }
    });
  }
  return inlineStyles; // 返回样式
}

/**
 * getStylesAtOffset 得到偏移量的样式
 * @param inlineStyles 行内样式
 * @param offset 偏移量
 */
export function getStylesAtOffset(
  inlineStyles: InlineStyle,
  offset: string | number
): { [key: string]: boolean } {
  const styles: { [key: string]: boolean } = {}; // 样式
  if (inlineStyles.COLOR[offset]) {
    styles.COLOR = inlineStyles.COLOR[offset];
  }
  if (inlineStyles.BGCOLOR[offset]) {
    styles.BGCOLOR = inlineStyles.BGCOLOR[offset];
  }
  if (inlineStyles.FONTSIZE[offset]) {
    styles.FONTSIZE = inlineStyles.FONTSIZE[offset];
  }
  if (inlineStyles.FONTFAMILY[offset]) {
    styles.FONTFAMILY = inlineStyles.FONTFAMILY[offset];
  }
  if (inlineStyles.UNDERLINE[offset]) {
    styles.UNDERLINE = true;
  }
  if (inlineStyles.ITALIC[offset]) {
    styles.ITALIC = true;
  }
  if (inlineStyles.BOLD[offset]) {
    styles.BOLD = true;
  }
  if (inlineStyles.STRIKETHROUGH[offset]) {
    styles.STRIKETHROUGH = true;
  }
  if (inlineStyles.CODE[offset]) {
    styles.CODE = true;
  }
  if (inlineStyles.SUBSCRIPT[offset]) {
    styles.SUBSCRIPT = true;
  }
  if (inlineStyles.SUPERSCRIPT[offset]) {
    styles.SUPERSCRIPT = true;
  }

  return styles;
}

/**
 * sameStyleAsPrevious 判断是否和上一个样式一致
 * @param inlineStyles 行内样式
 * @param styles 样式
 * @param index 偏移量
 */
export function sameStyleAsPrevious(
  inlineStyles: any, // 行内样式
  styles: any[], // 样式
  index: number // 偏移量
): boolean {
  let sameStyled = true; // 默认一致
  if (index > 0 && index < inlineStyles.length) { // 如果偏移量大于 0 并且 偏移量 小于 行内样式长度
    styles.forEach((style: string | number) => { // 遍历样式
      sameStyled =
        sameStyled &&
        inlineStyles[style][index] === inlineStyles[style][index - 1];
    });
  } else {
    sameStyled = false;
  }
  return sameStyled;
}

/**
 * addInlineStyleMarkup 增加行内样式标记
 * @param style 样式
 * @param content 文本
 */
export function addInlineStyleMarkup(style: string, content: string): string {
  if (style === 'BOLD') {
    return `<strong>${content}</strong>`;
  }
  if (style === 'ITALIC') {
    return `<em>${content}</em>`;
  }
  if (style === 'UNDERLINE') {
    return `<ins>${content}</ins>`;
  }
  if (style === 'STRIKETHROUGH') {
    return `<del>${content}</del>`;
  }
  if (style === 'CODE') {
    return `<code>${content}</code>`;
  }
  if (style === 'SUPERSCRIPT') {
    return `<sup>${content}</sup>`;
  }
  if (style === 'SUBSCRIPT') {
    return `<sub>${content}</sub>`;
  }
  return content;
}

/**
 * getSectionText 得到文本, 并且添加行内样式标记
 * @param text 文本
 */
function getSectionText(text: any[]) {
  if (text && text.length > 0) {
    const chars = text.map((ch: any) => {
      switch (ch) {
        case '\n':
          return '<br>';
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        default:
          return ch; // 其他字符
      }
    });
    return chars.join('');
  }
  return '';
}

/**
 * addStylePropertyMarkup 增加样式属性标记
 * @param styles 样式
 * @param text 文本
 */
export function addStylePropertyMarkup(
  styles: { COLOR: any; BGCOLOR: any; FONTSIZE: string; FONTFAMILY: any },
  text: string
) {
  if (
    styles &&
    (styles.COLOR || styles.BGCOLOR || styles.FONTSIZE || styles.FONTFAMILY)
  ) {
    let styleString = 'style="';
    if (styles.COLOR) {
      styleString += `color: ${styles.COLOR};`;
    }
    if (styles.BGCOLOR) {
      styleString += `background-color: ${styles.BGCOLOR};`;
    }
    if (styles.FONTSIZE) {
      styleString += `font-size: ${styles.FONTSIZE}${
        /^\d+$/.test(styles.FONTSIZE) ? 'px' : ''
      };`;
    }
    if (styles.FONTFAMILY) {
      styleString += `font-family: ${styles.FONTFAMILY};`;
    }
    styleString += '"';
    return `<span ${styleString}>${text}</span>`;
  }
  return text;
}

/**
 * getEntityMarkup 得到实体标记
 * @param entityMap 实体
 * @param entityKey 实体key
 * @param text 文本
 */
function getEntityMarkup(
  entityMap: { [x: string]: any },
  entityKey: string | number,
  text: string
) {
  const entity = entityMap[entityKey];
  if (entity.type === 'MRENTION') { // 如果是 @
    return `<a href="${entity.data.url}" class="wysiwyg-mention" data-mention data-value="${entity.data.value}">${text}</a>`;
  }
  if (entity.type === 'LINK') { // 如果是链接
    const targetOption = entity.data.targetOption || '_self';
    return `<a href="${entity.data.url}" target="${targetOption}">${text}</a>`;
  }
  if (entity.type === 'IMAGE') { // 如果是图片
    const { alignment } = entity.data; // 对齐方式
    if (alignment && alignment.length) {
      return `<div style="text-align:${alignment};"><img src="${entity.data.src}" alt="${entity.data.alt}" style="height: ${entity.data.height}px;width: ${entity.data.width}px;text-align:${alignment}"/></div>`;
    }
    return `<img src="${entity.data.src}" alt="${entity.data.alt}" style="height: ${entity.data.height}px;width: ${entity.data.width}px"/>`;
  }
  if (entity.type === 'EMBEDDED_LINK') { // 如果是嵌入链接
    return `<iframe width="${entity.data.width}" height="${entity.data.height}" src="${entity.data.src}" frameBorder="0"></iframe>`;
  }
  return text; // 其他实体
}

/**
 * getInlineStyleSections 得到行内样式的分段
 * @param block 段落
 * @param styles 样式
 * @param start 开始位置
 * @param end 结束位置
 */
function getInlineStyleSections(
  block: BlockType,
  styles: string[],
  start: any,
  end: number
) {
  const styleSections = new Array(); 
  const text = Array.from(block.text); // 文本
  if (text.length > 0) { // 如果有文本
    const inlineStyles = getStyleArrayForBlock(block); // 获取行内样式
    let section: { text: any; end: any; styles?: any; start?: any } = { text: '', end: 0 }; // 分段
    for (let i = start; i < end; i += 1) { // 循环
      if (i !== start && sameStyleAsPrevious(inlineStyles, styles, i)) { // 如果是同一种样式
        section.text.push(text[i]); // 添加文本
        section.end = i + 1; // 结束位置
      } else {
        section = {
          styles: getStylesAtOffset(inlineStyles, i), // 获取样式
          text: [text[i]], // 文本
          start: i, // 开始位置
          end: i + 1, // 结束位置
        };
        styleSections.push(section); // 添加分段
      }
    }
  }
  return styleSections;
}

/**
 * trimLeadingZeros 去除前面的空格
 * @param sectionText 段落文本
 */
export function trimLeadingZeros(sectionText: string) {
  if (sectionText) {
    let replacedText = sectionText;
    for (let i = 0; i < replacedText.length; i += 1) { // 循环
      if (sectionText[i] === ' ') { // 如果是空格
        replacedText = replacedText.replace(' ', '&nbsp;'); // 替换
      } else {
        break;
      }
    }
    return replacedText;
  }
  return sectionText;
}

/**
 * trimTrailingZeros 去除尾部的空格
 * @param sectionText 段落文本
 */
export function trimTrailingZeros(sectionText: string) {
  if (sectionText) {
    let replacedText = sectionText;
    for (let i = replacedText.length - 1; i >= 0; i -= 1) {
      if (replacedText[i] === ' ') {
        replacedText = `${replacedText.substring( // 子串
          0, // 开始位置
          i // 结束位置
        )}&nbsp;${replacedText.substring(i + 1)}`; // 替换
      } else {
        break;
      }
    }
    return replacedText;
  }
  return sectionText;
}

/**
 * getStyleTagSectionMarkup 得到样式标签的分段
 * @param styleSection 段落样式
 */
function getStyleTagSectionMarkup(styleSection: { styles: any; text: any }) {
  const { styles, text } = styleSection; // 段落样式
  let content = getSectionText(text); // 得到文本
  forListEach(styles, (style: any, value: any) => {
    content = addInlineStyleMarkup(style, content); // 添加样式标签
  });
  return content;
}

/**
 * getInlineStyleSectionMarkup 得到行内样式的分段
 * @param block 段落
 * @param styleSection 段落样式
 */
function getInlineStyleSectionMarkup(
  block: any,
  styleSection: { start: any; end: any; styles: any }
) {
  const styleTagSections = getInlineStyleSections( // 得到行内样式的分段
    block, // 段落
    [
      'BOLD',
      'ITALIC',
      'UNDERLINE',
      'STRIKETHROUGH',
      'CODE',
      'SUPERSCRIPT',
      'SUBSCRIPT',
    ],
    styleSection.start,
    styleSection.end
  );
  let styleSectionText = '';
  styleTagSections.forEach(stylePropertySection => {
    styleSectionText += getStyleTagSectionMarkup(stylePropertySection); // 得到样式标签的分段
  });
  styleSectionText = addStylePropertyMarkup( // 添加样式属性标签
    styleSection.styles,
    styleSectionText
  );
  return styleSectionText;
}

/**
 * getSectionMarkup 得到分段的标签
 * @param block 段落
 * @param entityMap 实体
 * @param section 段落
 */
function getSectionMarkup(
  block: any,
  entityMap: any,
  section: { start: any; end: any; type: string; entityKey: any }
) {
  const entityInlineMarkup = new Array(); // 实体标签
  const inlineStyleSections = getInlineStyleSections( // 得到行内样式的分段
    block,
    ['COLOR', 'BGCOLOR', 'FONTSIZE', 'FONTFAMILY'],
    section.start,
    section.end
  );
  inlineStyleSections.forEach(styleSection => { 
    entityInlineMarkup.push(getInlineStyleSectionMarkup(block, styleSection)); // 得到行内样式的分段
  });
  let sectionText = entityInlineMarkup.join(''); // 得到文本
  if (section.type === 'ENTITY') { // 如果是实体
    if (section.entityKey !== undefined && section.entityKey !== null) { // 如果有实体
      sectionText = getEntityMarkup(entityMap, section.entityKey, sectionText); // 得到实体标签
    }
  } else if (section.type === 'HASHTAG') { // 如果是标签
    sectionText = `<a href="${sectionText}" class="wysiwyg-hashtag">${sectionText}</a>`; // 得到标签标签
  }
  return sectionText;
}

/**
 * getBlockInnerMarkup 得到段落的标签
 * @param block 段落
 * @param entityMap 实体
 */
export function getBlockInnerMarkup(block: BlockType, entityMap: any) {
  const blockMarkup = new Array();
  const sections = getSections(block); // 得到分段
  sections.forEach((section, index) => {
    let sectionText = getSectionMarkup(block, entityMap, section); // 得到分段的标签
    if (index === 0) {
      sectionText = trimLeadingZeros(sectionText); // 去除头部的空格
    }
    if (index === sections.length - 1) {
      sectionText = trimTrailingZeros(sectionText); // 去除尾部的空格
    }
    blockMarkup.push(sectionText); // 得到文本
  });
  return blockMarkup.join(''); // 得到段落的标签
}

/**
 * getBlockMarkup
 * @param block 段落
 * @param entityMap 实体
 */
export function getBlockMarkup(block: BlockType, entityMap: any) {
  const blockHtml = new Array();
  if (isAtomicEntityBlock(block)) {
    blockHtml.push(
      getEntityMarkup(entityMap, block.entityRanges[0].key, block.text)
    );
  } else {
    const blockTag = getBlockTag(block.type); // 得到段落标签
    if (blockTag) { // 如果有段落标签
      blockHtml.push(`<${blockTag}`); // 添加段落标签
      const blockStyle = getBlockStyle(block.data); // 得到段落样式
      if (blockStyle) { 
        blockHtml.push(` style="${blockStyle}"`); // 添加段落样式
      }
      blockHtml.push('>'); // 添加段落标签
      blockHtml.push(getBlockInnerMarkup(block, entityMap)); // 得到段落的标签
      blockHtml.push(`</${blockTag}>`); // 添加段落标签
    }
  }
  blockHtml.push('\n');
  return blockHtml.join('');
}
