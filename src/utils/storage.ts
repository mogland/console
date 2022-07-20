/*
 * @FilePath: /nx-admin/src/utils/storage.ts
 * @author: Wibus
 * @Date: 2022-07-15 17:35:08
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-20 23:15:38
 * Coding With IU
 */

import { decrypt, encrypt } from "./encrypt";

const config = {
  type: 'localStorage',
  prefix: 'nx-admin',
  expire: 100000, // 过期时间, 单位: 秒
  isEncrypt: false, // 是否加密
  renew: true // 是否每次获取都重新设置过期时间
}

/**
 * 设置存储
 * @param key 键
 * @param value 值
 * @param expire 过期时间, 单位: 秒
 */
export const setStorage = (key: string, value: any, expire = 10000) => {
  if (value === '' || value === null || value === undefined) value = null;
  if (isNaN(expire) || expire < 1) throw new Error('expire must be a number greater than 0');
  expire = (expire ? expire : config.expire) * 60000; // 转换为毫秒
  const data = {
    value, // 值
    expire, // 设置过期时间
    time: Date.now() // 设置当前时间
  }
  const encryptString = config.isEncrypt ? encrypt(JSON.stringify(data)): JSON.stringify(data);
  window[config.type].setItem(`${config.prefix}-${key}`, encryptString);
}

/**
 * 获取存储的值
 * @param key 键
 */
export const getStorage = (key: any) => {
  if (!window[config.type].getItem(`${config.prefix}-${key}`) || JSON.stringify(window[config.type].getItem(`${config.prefix}-${key}`)) === 'null') {// 如果没有值
    return null
  }
  const data = config.isEncrypt ? JSON.parse(decrypt(window[config.type].getItem(`${config.prefix}-${key}`))) : JSON.parse(window[config.type].getItem(`${config.prefix}-${key}`));
  if (data.expire < (Date.now() - data.time)) { // 如果过期了
    window[config.type].removeItem(`${config.prefix}-${key}`); // 移除过期的数据
    return null
  } else {
    if (config.renew) setStorage(key, data.value, data.expire); // 如果需要重新设置过期时间, 则重新设置
    return data.value
  }
}

/**
 * 移除某一个存储的值
 * @param key 键
 */
export const removeStorage = (key: any) => {
  window[config.type].removeItem(`${config.prefix}-${key}`);
}

/**
 * 获取所有的存储数据
 */
export const getAllStorage = () => {
  let len = window[config.type].length // 获取长度
  let arr = new Array() // 定义数据集
  for (let i = 0; i < len; i++) {
    let getKey = window[config.type].key(i)
    let getVal = window[config.type].getItem(getKey)
    arr[i] = { 'key': getKey, 'val': getVal, }
  }
  return arr
}

/**
 * 删除所有的存储数据
 */
export const clearStorage = () => {
  window[config.type].clear();
}

/**
 * 判断是否存在某个key
 * @param key 需要判断的key
 */
export const hasStorage = (key: any) => {
  key = `${config.prefix}-${key}`
  let arr = getAllStorage().filter((item)=>{
      return item.key === key;
  })
  return arr.length ? true : false;
}

/**
 * 获取所有key
 */
export const getStorageKeys = () => {
  let items = getAllStorage()
  let keys = []
  for (let index = 0; index < items.length; index++) {
      keys.push(items[index].key)
  }
  return keys
}

/**
 * 根据索引获取key
 * @param index 索引
 */
export const getStorageForIndex = (index: any) => {
  return window[config.type].key(index)
}

/**
 * 获取localStorage长度
 */
export const getStorageLength = () => {
  return window[config.type].length
}
