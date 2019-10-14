const REG_IMG_URL = /^(?:(?:http|https):)?\/\/(ossgw\.(?:alicdn|taobaocdn|taobao)\.(?:com|net))(\/.*(?:\.(jpg|png|gif|jpeg|webp))?)$/i;

/**
 * @param {String} url
 * @returns {RegExpMatchArray}
 */
export default function(url: string) {
  return url.match(REG_IMG_URL);
}
