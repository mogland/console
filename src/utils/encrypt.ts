/*
 * @FilePath: /nx-admin/src/utils/encrypt.ts
 * @author: Wibus
 * @Date: 2022-07-20 22:31:17
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-21 13:04:43
 * Coding With IU
 */
import CryptoJS from 'crypto-js'
import { message } from 'react-message-popup';

const SECRET_KEY = CryptoJS.enc.Utf8.parse("3333e6e143439161");
const SECRET_IV = CryptoJS.enc.Utf8.parse("e3bbe7e3ba84431a");

/**
 * 加密方法
 * @param data
 */
export function encrypt(data: any) {
  if (typeof data === "object") {
    try {
      data = JSON.stringify(data);
    } catch (error: any) {
      message.error("encrypt error:", error.message)
      console.error("encrypt error:", error);
    }
  }
  const dataHex = CryptoJS.enc.Utf8.parse(data);
  const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
}

/**
 * 解密方法
 * @param data
 */
 export function decrypt(data: any) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}