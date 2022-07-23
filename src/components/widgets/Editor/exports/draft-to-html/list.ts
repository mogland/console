import { getBlockTag, getBlockStyle, getBlockInnerMarkup } from './block';

/**
 * isList 判断是否是列表
 * @param blockType 
 */
export function isList(blockType) {
  return (
    blockType === 'unordered-list-item' || blockType === 'ordered-list-item'
  );
}

/**
 * getListMarkup 获取列表的html
 * @param listBlocks 列表的block
 * @param entityMap 实体map
 */
export function getListMarkup(listBlocks, entityMap) {
  const listHtml = new Array();
  let nestedListBlock = new Array(); // 存放嵌套的list
  let previousBlock: { type: any; depth: any } = { type: 'unordered-list-item', depth: 0 };
  listBlocks.forEach(block => {
    let nestedBlock = false; // 是否为嵌套列表
    if (!previousBlock) { // 第一个block
      listHtml.push(`<${getBlockTag(block.type)}>\n`); // 列表开始
    } else if (previousBlock.type !== block.type) { // 列表类型不同
      listHtml.push(`</${getBlockTag(previousBlock.type)}>\n`); // 列表结束
      listHtml.push(`<${getBlockTag(block.type)}>\n`); // 列表开始
    } else if (previousBlock.depth === block.depth) { // 同一类型，同一层级
      if (nestedListBlock && nestedListBlock.length > 0) { // 存在嵌套列表
        listHtml.push(getListMarkup(nestedListBlock, entityMap)); // 嵌套列表
        nestedListBlock = []; // 清空嵌套列表
      }
    } else {
      nestedBlock = true; // 为嵌套列表
      nestedListBlock.push(block); // 存入嵌套列表
    }
    if (!nestedBlock) { // 不为嵌套列表
      listHtml.push('<li'); // 列表项开始
      const blockStyle = getBlockStyle(block.data); // 获取列表项样式
      if (blockStyle) { // 存在样式
        listHtml.push(` style="${blockStyle}"`); // 添加样式
      } 
      listHtml.push('>'); // 列表项开始
      listHtml.push(getBlockInnerMarkup(block, entityMap)); // 列表项内容
      listHtml.push('</li>\n'); // 列表项结束
      previousBlock = block; // 保存上一个block
    }
  });
  if (nestedListBlock && nestedListBlock.length > 0) { // 存在嵌套列表
    listHtml.push(getListMarkup(nestedListBlock, entityMap)); // 嵌套列表
  }
  listHtml.push(`</${getBlockTag(previousBlock.type)}>\n`); // 列表结束
  return listHtml.join(''); // 返回列表html
}
