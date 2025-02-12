import { Base64 } from 'js-base64'

export function encodeBase64(input) {
  return Base64.encode(input);
}

// Base64 解密
export function decodeBase64(input) {
  return Base64.decode(input);
}
