/*
 * @FilePath: /nx-admin/src/components/widgets/Editor/exports/draft-to-markdown/index.ts
 * @author: Wibus
 * @Date: 2022-07-23 16:30:24
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-23 16:51:36
 * Coding With IU
 */
const TRAILING_WHITESPACE = /[ \u0020\t\n]*$/; // 匹配列表

/**
 * MARKDOWN_STYLE_CHARACTERS 列表样式
 */
const MARKDOWN_STYLE_CHARACTERS = ['*', '_', '~', '`']; // 列表样式
/**
 * MARKDOWN_STYLE_CHARACTER_REGXP 列表样式
 */
const MARKDOWN_STYLE_CHARACTER_REGXP = /(\*|_|~|\\|`)/g;

let orderedListNumber: number[] = []; // 列表序号
let previousOrderedListDepth = 0; // 匹配列表

/**
 * StyleItems 格式
 */
const StyleItems = {
  'unordered-list-item': { // 未序列列表
    open() { // 开始列表
      return '- ';
    },

    close() { // 结束列表
      return '';
    },
  },

  'ordered-list-item': { // 序列列表
    open(number = 1) {
      return `${number}. `;
    },

    close() {
      return '';
    },
  },

  blockquote: { // 引用
    open() {
      return '> ';
    },

    close() {
      return '';
    },
  },

  'header-one': { // 头一级标题
    open() {
      return '# ';
    },

    close() {
      return '';
    },
  },

  'header-two': { // 头二级标题
    open() {
      return '## ';
    },

    close() {
      return '';
    },
  },

  'header-three': { // 头三级标题
    open() {
      return '### ';
    },

    close() {
      return '';
    },
  },

  'header-four': { // 头四级标题
    open() {
      return '#### ';
    },

    close() {
      return '';
    },
  },

  'header-five': { // 头五级标题
    open() {
      return '##### ';
    },

    close() {
      return '';
    },
  },

  'header-six': { // 头六级标题
    open() {
      return '###### ';
    },

    close() {
      return '';
    },
  },

  'code-block': { // 代码块
    open(block: { data: { language: any } }) {
      return `\`\`\`${block.data.language || ''}\n`;
    },

    close() {
      return '\n```';
    },
  },

  BOLD: { // 粗体 
    open() {
      return '**';
    },

    close() {
      return '**';
    },
  },

  ITALIC: { // 斜体
    open() {
      return ' _';
    },
    lineOpen() {
      return '_';
    },
    close() {
      return '_ ';
    },
    lineClose() {
      return '_';
    },
  },

  STRIKETHROUGH: { // 删除线
    open() {
      return '~~';
    },

    close() {
      return '~~';
    },
  },

  CODE: { // 代码
    open() {
      return '`';
    },

    close() {
      return '`';
    },
  },
};

/**
 * 渲染块
 */
interface ItemsType {
  [key: string]: any; // 列表样式
}

/**
 * EntiryItems 渲染块
 */
const EntityItems = {
  LINK: {
    open() {
      return '[';
    },

    close(entity: { data: { url: any; imagehref: any } }) {
      return `](${entity.data.url})`;
    },
  },
  IMAGE: {
    open() {
      return '![';
    },

    close(entity: { data: { src: any } }) {
      return `](${entity.data.src})`;
    },
  },
};

const SingleNewlineAfterBlock = ['unordered-list-item', 'ordered-list-item']; // 单独一行

/**
 * isEmptyBlock 是否为空块
 * @param block 块
 */
function isEmptyBlock(block: { 
  text: string | any[];
  entityRanges: string | any[];
  data: any;
}) {
  return (
    block.text.length === 0 && // 块文本为空
    block.entityRanges.length === 0 && // 块实体为空
    Object.keys(block.data || {}).length === 0 // 块数据为空
  );
}

/**
 * renderBlock 渲染块
 * @param block 块
 * @param index 块索引
 * @param rawDraftObject 原始对象
 * @param options 配置
 */
function renderBlock(
  block: any,
  index: any,
  rawDraftObject: any,
  options: any
) {
  // const openInlineStyles = [];
  let markdownToAdd: { type: string; style?: any; value: any }[] = []; // 渲染的文本
  let markdownString = ''; // 渲染的文本
  const customStyleItems = options.styleItems || {}; // 自定义样式
  const customEntityItems = options.entityItems || {}; // 自定义实体
  const escapeMarkdownCharacters = options.hasOwnProperty( // 转义字符
    'escapeMarkdownCharacters'
  )
    ? options.escapeMarkdownCharacters
    : true;

  let { type } = block; // 块类型

  /**
   * markdownStyleCharactersToEscape 转义字符
   */
  const markdownStyleCharactersToEscape: {
    character: unknown;
    index: number;
    markdownStringIndexStart: number;
    markdownStringIndexEnd: any;
  }[] = [];

  if (isEmptyBlock(block) && !options.preserveNewlines) { // 块为空
    type = 'unstyled';
  }

  if (customStyleItems[type] || (StyleItems as ItemsType)[type]) { // 自定义样式
    if (type === 'unordered-list-item' || type === 'ordered-list-item') { // 序列列表
      markdownString += ' '.repeat(block.depth * 4); // 缩进
    }

    if (type === 'ordered-list-item') { // 有序列表
      orderedListNumber[block.depth] = orderedListNumber[block.depth] || 1; // 有序列表序号
      markdownString += (
        customStyleItems[type] || (StyleItems as ItemsType)[type] // 自定义样式
      ).open(block, orderedListNumber[block.depth]); // 打开样式
      orderedListNumber[block.depth] += 1; // 有序列表序号

      if (previousOrderedListDepth > block.depth) { // 有序列表深度变化
        orderedListNumber[previousOrderedListDepth] = 1; // 有序列表序号
      }

      previousOrderedListDepth = block.depth; // 有序列表深度变化
    } else if (type === 'italic') { // 斜体
      orderedListNumber = []; // 有序列表序号
      markdownString += ( 
        customStyleItems[type] || (StyleItems as ItemsType)[type] // 自定义样式
      ).lineOpen(block); // 打开样式
    } else {
      orderedListNumber = []; // 有序列表序号
      markdownString += (
        customStyleItems[type] || (StyleItems as ItemsType)[type] 
      ).open(block); // 打开样式
    }
  }

  const openTags: any[] = [];

  /**
   * openTag 打开标签
   * @param tag 标签
   */
  function openTag(tag: { style: string | number; key: string | number }) {
    openTags.push(tag);
    if (tag.style) { // 样式
      if (customStyleItems[tag.style] || (StyleItems as ItemsType)[tag.style]) { // 自定义样式
        const styleToAdd = (
          customStyleItems[tag.style] || (StyleItems as ItemsType)[tag.style] // 自定义样式
        ).open();
        markdownToAdd.push({ // 渲染的文本
          type: 'style',
          style: tag,
          value: styleToAdd,
        });
      }
    } else { // 标签
      const entity = rawDraftObject.entityMap[tag.key]; // 实体
      if (entity) {
        if (
          customEntityItems[entity.type] ||
          (EntityItems as ItemsType)[entity.type]
        ) {
          const entityToAdd = (
            customEntityItems[entity.type] ||
            (EntityItems as ItemsType)[entity.type]
          ).open(entity);
          markdownToAdd.push({
            type: 'entity',
            value: entityToAdd,
          });
        }
      }
    }
  }

  function closeTag(tag: { style: string | number; key: string | number }) {
    const popped = openTags.pop(); // 弹出标签
    if (tag !== popped) { // 标签不匹配
      throw new Error(
        'Invariant violation: 在闭合所有标签之前无法关闭此标签'
      );
    }

    if (tag.style) { // 样式
      if (customStyleItems[tag.style] || (StyleItems as ItemsType)[tag.style]) { // 自定义样式
        const trailingWhitespace = TRAILING_WHITESPACE.exec(markdownString); // 尾随空白
        markdownString = markdownString.slice( // 删除尾随空白
          0,
          markdownString.length - trailingWhitespace![0].length
        );

        markdownString += (
          customStyleItems[tag.style] || (StyleItems as ItemsType)[tag.style] // 自定义样式
        ).close(); // 关闭样式
        markdownString += trailingWhitespace![0]; // 尾随空白
      }
    } else {
      const entity = rawDraftObject.entityMap[tag.key]; // 实体
      if (entity) { // 实体
        if (
          customEntityItems[entity.type] || // 自定义实体
          (EntityItems as ItemsType)[entity.type] // 实体
        ) {
          markdownString += ( 
            customEntityItems[entity.type] ||
            (EntityItems as ItemsType)[entity.type]
          ).close(entity); // 关闭实体
        }
      }
    }
  }

  const compareTagsLastCloseFirst = ( // 比较标签
    a: { offset: any; length: any }, 
    b: { offset: any; length: any }
  ) => b.offset + b.length - (a.offset + a.length); 

  const reverse = (array: any[]) => array.concat().reverse(); // 反转数组

  Array.from(block.text).some(function(character: any, characterIndex) { // 字符串遍历
    reverse(openTags).forEach((tag, indexNum) => { // 反转标签
      if (tag.offset + tag.length === characterIndex) { // 如果标签结束位置等于字符串索引
        const tagsToSplit = openTags.slice(openTags.indexOf(tag) + 1);  // 截取标签

        reverse(tagsToSplit).forEach(closeTag); // 反转标签并关闭

        closeTag(tag); // 关闭标签

        tagsToSplit.sort(compareTagsLastCloseFirst).forEach(openTag); // 打开标签
      }
    });

    const inlineTagsToOpen = block.inlineStyleRanges.filter( // 可打开的内联标签
      (tag: { offset: number }) => tag.offset === characterIndex // 内联标签索引
    );
    const entityTagsToOpen = block.entityRanges.filter( // 可打开的实体标签
      (tag: { offset: number }) => tag.offset === characterIndex // 实体标签索引
    );
    inlineTagsToOpen // 可打开的内联标签
      .concat(entityTagsToOpen) // concat 合并
      .sort(compareTagsLastCloseFirst) // 排序
      .forEach(openTag); // 打开标签
    if (block.type !== 'atomic') { // 如果不是原子标签
      if (character !== ' ' && markdownToAdd.length) { // 如果字符不是空格并且有渲染的文本
        markdownString += markdownToAdd // 添加渲染的文本
          .map(function(item) { // 渲染的文本遍历
            return item.value; // 渲染的文本
          })
          .join(''); // 合并渲染的文本

        markdownToAdd = []; // 清空渲染的文本
      }
    } else {
      markdownString += markdownToAdd // 添加渲染的文本
        .map(function(item) { 
          return item.value; 
        })
        .join(''); // 合并渲染的文本
      markdownToAdd = []; // 清空渲染的文本
    } 

    if (block.type !== 'code-block' && escapeMarkdownCharacters) { // 如果不是代码块并且需要转义特殊字符
      const insideInlineCodeStyle = openTags.find( // 内联标签
        style => style.style === 'CODE' // 内联标签样式
      );
      if (!insideInlineCodeStyle)// 如果不是内联标签
      {
        if (
          characterIndex === 0 && // 如果是第一个字符
          character === '#' && // 如果字符是#
          block.text[1] && // 如果字符后面有字符
          block.text[1] === ' ' // 如果字符后面是空格
        ) {
          character = character.replace('#', '\\#'); // 转义#
        } else if (characterIndex === 0 && character === '>') { // 如果是第一个字符并且字符是>
          character = character.replace('>', '\\>'); // 转义>
        }
        if (MARKDOWN_STYLE_CHARACTERS.includes(character)) { // 如果字符是特殊字符
          const openingStyle = markdownStyleCharactersToEscape.find(function( // 找到转义的样式
            item // 转义的样式
          ) {
            return item.character === character; // 返回转义的样式
          });
          if (
            !openingStyle && // 如果不是转义的样式
            block.text[characterIndex - 1] === ' ' && // 如果字符前面有空格
            block.text[characterIndex + 1] !== ' ' // 如果字符后面不是空格
          ) {
            markdownStyleCharactersToEscape.push({ // 添加转义的样式
              character,  // 字符
              index: characterIndex,  // 索引
              markdownStringIndexStart: // 开始索引
                markdownString.length + character.length - 1,
              markdownStringIndexEnd: markdownString.length + character.length, // 结束索引
            });
          } else if (
            openingStyle && // 如果是转义的样式
            block.text[characterIndex - 1] === character && // 如果字符前面是转义的字符
            characterIndex === openingStyle.index + 1 // 如果字符索引是转义的字符索引+1
          ) { 
            openingStyle.markdownStringIndexEnd += 1; // 转义的样式结束索引+1
          } else if (openingStyle) { // 如果是转义的样式
            const openingStyleLength = // 转义的样式长度
              openingStyle.markdownStringIndexEnd -
              openingStyle.markdownStringIndexStart;
            let escapeCharacter = false; // 是否转义字符
            let popOpeningStyle = false; // 是否弹出转义的样式
            if (
              openingStyleLength === 1 && // 如果转义的样式长度是1
              (block.text[characterIndex + 1] === ' ' || // 如果字符后面是空格或
                !block.text[characterIndex + 1]) // 如果字符后面没有字符
            ) {
              popOpeningStyle = true; // 是否弹出转义的样式
              escapeCharacter = true; // 是否转义字符
            }

            if (
              openingStyleLength === 2 && // 如果转义的样式长度是2
              block.text[characterIndex + 1] === character // 如果字符后面是转义的字符
            ) {
              escapeCharacter = true; // 是否转义字符
            }

            if (
              openingStyleLength === 2 && // 如果转义的样式长度是2
              block.text[characterIndex - 1] === character && // 如果字符前面是转义的字符
              (block.text[characterIndex + 1] === ' ' || // 如果字符后面是空格或 如果字符后面没有字符
                !block.text[characterIndex + 1])
            ) {
              popOpeningStyle = true; // 是否弹出转义的样式
              escapeCharacter = true; // 是否转义字符
            }

            if (popOpeningStyle) { // 如果是弹出转义的样式
              markdownStyleCharactersToEscape.splice( // 删除转义的样式
                markdownStyleCharactersToEscape.indexOf(openingStyle), 1 ); // 删除转义的样式
              let replacementString = markdownString.slice( // 截取转义的样式
                openingStyle.markdownStringIndexStart, // 开始索引
                openingStyle.markdownStringIndexEnd // 结束索引
              );
              replacementString = replacementString.replace( // 替换转义的样式
                MARKDOWN_STYLE_CHARACTER_REGXP, // 正则
                '\\$1' // 替换
              );
              markdownString =
                markdownString.slice(0, openingStyle.markdownStringIndexStart) + // 截取转义的样式前面的字符
                replacementString + // 替换转义的样式
                markdownString.slice(openingStyle.markdownStringIndexEnd); // 截取转义的样式后面的字符
            }

            if (escapeCharacter) { // 如果是转义字符
              character = `\\${character}`; // 转义字符
            }
          }
        }
      }
    }

    if (character === '\n' && type === 'blockquote') { // 如果是段落
      markdownString += '\n> '; // 添加段落
    } else {
      const newText = character.replace(/\s{2,}/g, ' '); // 替换多个空格
      markdownString += newText; // 添加字符
    }
  });

  reverse(openTags).forEach(closeTag); // 反转开始标签

  if (customStyleItems[type] || (StyleItems as ItemsType)[type]) { // 如果是自定义样式或者样式
    if (type === 'italic') { // 如果是斜体
      markdownString += (
        customStyleItems[type] || (StyleItems as ItemsType)[type]
      ).lineClose(block); // 添加斜体
    } else { 
      markdownString += (
        customStyleItems[type] || (StyleItems as ItemsType)[type]
      ).close(block); // 添加样式
    }
  }
  if (
    SingleNewlineAfterBlock.indexOf(type) !== -1 && // 如果是段落
    rawDraftObject.blocks[index + 1] && // 如果下一个块存在
    SingleNewlineAfterBlock.indexOf(rawDraftObject.blocks[index + 1].type) !== -1  // 如果下一个块是段落
  ) {
    markdownString += '\n'; // 添加换行
  } else if (rawDraftObject.blocks[index + 1]) { // 如果下一个块存在
    if (rawDraftObject.blocks[index].text) { // 如果有文本
      if (
        SingleNewlineAfterBlock.indexOf(type) !== -1 && 
        SingleNewlineAfterBlock.indexOf( // 如果下一个块是段落
          rawDraftObject.blocks[index + 1].type // 下一个块的类型
        ) === -1
      ) {
        markdownString += '\n\n';
      } else if (!options.preserveNewlines) {
        markdownString += '\n\n';
      } else {
        markdownString += '\n';
      }
    } else if (options.preserveNewlines) {
      markdownString += '\n';
    }
  }

  return markdownString;
}

function draftToMarkdown(rawDraftObject: { blocks: any[] }, options?: {}) {
  options = options || {};
  let markdownString = '';
  rawDraftObject.blocks.forEach(function(block, index) {
    if (block)
      markdownString += renderBlock(block, index, rawDraftObject, options);
  });

  orderedListNumber = [];
  return markdownString;
}

export default draftToMarkdown;
